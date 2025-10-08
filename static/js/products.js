import { withCsrf } from './csrf.js';

const $ = (id) => document.getElementById(id);
const Q = (sel) => document.querySelector(sel);

let allProducts = [];
let activeFilter = 'all';
let deletingProductId = null;

// ----- sections -----
const grid = $('grid');
const loading = $('loading');
const errorBox = $('error');
const emptyBox = $('empty');
const btnAll = $('filter-all');
const btnMy = $('filter-my');
const btnRefresh = $('refresh-btn');
const btnCreate = $('create-btn');
const btnEmptyCreate = $('empty-create');

// ----- modal -----
const productModal = $('productModal');
const productForm = $('productForm');
const productId = $('productId');
const productModalTitle = $('productModalTitle');
const confirmDeleteModal = $('confirmDeleteModal');
const confirmDeleteBtn = $('confirmDeleteBtn');

function toggleSections({showLoading=false, showError=false, showEmpty=false, showGrid=false}) {
  loading?.classList.toggle('hidden', !showLoading);
  errorBox?.classList.toggle('hidden', !showError);
  emptyBox?.classList.toggle('hidden', !showEmpty);
  grid?.classList.toggle('hidden', !showGrid);
  if (showGrid) grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
}

function updateFilterButtons(){
  if (!btnAll || !btnMy) return;
  if (activeFilter === 'all') {
    btnAll.className = 'bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700';
    btnMy.className = 'bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md font-medium hover:bg-green-600 hover:text-white';
  } else {
    btnMy.className = 'bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700';
    btnAll.className = 'bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md font-medium hover:bg-green-600 hover:text-white';
  }
}

function urlFill(tpl, id){
  return tpl.replace('00000000-0000-0000-0000-000000000000', id);
}

function categoryLabel(code) {
  const map = { shoes:'Shoes', clothing:'Clothing', equipment:'Equipment', accessories:'Accessories' };
  return map[code] || code;
}

function sanitizeHTML(html){ return DOMPurify.sanitize(html); }

function productCard(p){
  const detailLink = urlFill(window.ENDPOINTS.showProductTpl, p.id);
  const canEdit = window.CURRENT_USER_ID && Number(window.CURRENT_USER_ID) === Number(p.user_id);
  const created = '';

  const thumb = p.thumbnail 
    ? `<img src="${sanitizeHTML(p.thumbnail)}" alt="${sanitizeHTML(p.name)}" class="w-full h-full object-cover">`
    : `<div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">No Image</div>`;
  const featured = p.is_featured ? `<span class='inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800'>Featured</span>` : '';

  const actions = canEdit ? `
    <div class='flex gap-3 text-sm'>
      <button class="text-gray-600 hover:text-gray-800" data-edit="${p.id}">Edit</button>
      <button class="text-red-600 hover:text-red-700" data-del="${p.id}">Delete</button>
    </div>` : '';

  const html = `
  <article class="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full">
    <div class="aspect-[16/9] relative overflow-hidden">
      ${thumb}
      <div class="absolute top-3 left-3">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-600 text-white">${sanitizeHTML(categoryLabel(p.category))}</span>
      </div>
      <div class="absolute top-3 right-3 flex space-x-2">${featured}</div>
    </div>
    <div class="p-5 flex flex-col flex-1">
      <div class="flex items-center text-sm text-gray-500 mb-3">
        <time>${sanitizeHTML(created)}</time>
        <span class="mx-2">•</span>
        <span>${sanitizeHTML(String(p.stock))} pcs</span>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
        <a href="${detailLink}" class="hover:text-green-600 transition-colors">${sanitizeHTML(p.name)}</a>
      </h3>
      <p class="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">${sanitizeHTML(p.description || '')}</p>
      <div class="pt-4 border-t border-gray-100 flex items-center justify-between">
        <span class="font-medium text-green-700">Rp ${sanitizeHTML(String(p.price))}</span>
        ${actions}
      </div>
    </div>
  </article>`;
  const el = document.createElement('div');
  el.innerHTML = html.trim();
  const card = el.firstChild;
  // Bind edit/delete
  card.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', () => openUpdateModal(p.id)));
  card.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => openDeleteModal(p.id)));
  return card;
}

function renderGrid(items){
  grid.innerHTML = '';
  items.forEach(p => grid.appendChild(productCard(p)));
}

function filterAndDisplay(){
  updateFilterButtons();
  const data = activeFilter === 'all'
    ? allProducts
    : allProducts.filter(p => Number(p.user_id) === Number(window.CURRENT_USER_ID));
  if (data.length === 0) toggleSections({showEmpty:true});
  else { renderGrid(data); toggleSections({showGrid:true}); }
}

async function fetchProducts(){
  try{
    toggleSections({showLoading:true});
    const res = await fetch(window.ENDPOINTS.productsList, { headers: { 'Accept':'application/json' }});
    if(!res.ok) throw new Error('Fetch products failed');
    allProducts = await res.json() || [];
    filterAndDisplay();
  }catch(e){
    console.error(e);
    toggleSections({showError:true});
  }
}

// ----- modal helpers -----
function openCreateModal(){
  productForm.reset();
  productId.value = '';
  $('is_featured').checked = false;
  productModalTitle.textContent = 'Create Product';
  productModal.classList.remove('hidden');
}

async function openUpdateModal(id){
  // load detail
  try{
    toggleSections({showLoading:true});
    const url = urlFill(window.ENDPOINTS.productDetailTpl, id);
    const res = await fetch(url, { headers: { 'Accept':'application/json' }});
    if(!res.ok) throw new Error('Fetch detail failed');
    const p = await res.json();

    productForm.reset();
    productId.value = p.id;
    $('name').value = p.name || '';
    $('price').value = p.price ?? 0;
    $('stock').value = p.stock ?? 0;
    $('category').value = p.category || 'clothing';
    $('thumbnail').value = p.thumbnail || '';
    $('description').value = p.description || '';
    $('is_featured').checked = !!p.is_featured;

    productModalTitle.textContent = 'Update Product';
    productModal.classList.remove('hidden');
  }catch(e){
    console.error(e);
    showToast('Failed to load product', '', 'error');
  }finally{
    toggleSections({showGrid:true});
  }
}

function openDeleteModal(id){
  deletingProductId = id;
  confirmDeleteModal.classList.remove('hidden');
}

window.closeProductModal = () => productModal.classList.add('hidden');
window.closeDeleteModal = () => { confirmDeleteModal.classList.add('hidden'); deletingProductId = null; };

// ----- submit create/update -----
productForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(productForm);
  const isUpdate = !!productId.value;
  try{
    const url = isUpdate
      ? urlFill(window.ENDPOINTS.updateProductTpl, productId.value)
      : window.ENDPOINTS.createProduct;
    const res = await fetch(url, withCsrf({ method:'POST', body: form }));
    const data = await res.json();
    if(!res.ok || data.status !== 'ok') throw new Error('Save failed');
    showToast(isUpdate ? 'Product updated' : 'Product created', '', 'success');
    window.closeProductModal();
    await fetchProducts();
  }catch(err){
    console.error(err);
    showToast('Failed to save product', '', 'error');
  }
});

// ----- confirm delete -----
confirmDeleteBtn?.addEventListener('click', async () => {
  if(!deletingProductId) return;
  try{
    const url = urlFill(window.ENDPOINTS.deleteProductTpl, deletingProductId);
    const res = await fetch(url, withCsrf({ method:'POST' }));
    const data = await res.json();
    if(!res.ok || data.status !== 'ok') throw new Error('Delete failed');
    showToast('Product deleted', '', 'success');
    window.closeDeleteModal();
    await fetchProducts();
  }catch(err){
    console.error(err);
    showToast('Failed to delete', '', 'error');
  }
});

// ----- filter / buttons -----
btnAll?.addEventListener('click', () => { activeFilter='all'; filterAndDisplay(); });
btnMy?.addEventListener('click', () => { activeFilter='my'; filterAndDisplay(); });

btnRefresh?.addEventListener('click', fetchProducts);
btnCreate?.addEventListener('click', openCreateModal);
btnEmptyCreate?.addEventListener('click', openCreateModal);

// init
document.addEventListener('DOMContentLoaded', () => {
  if(grid) fetchProducts();
});