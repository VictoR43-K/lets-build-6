/**
 * APEX TACKLE - Premium Fishing Ecommerce
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initHeader();
    initMobileMenu();
    initLiveChat();
    initHeroSlider();
    initSearch();
    initProductFilters();
    initProductCards();
    initCart();
    initGallery();
    initTabs();
    initQuantitySelectors();
    initScrollAnimations();
});

/**
 * Mobile Hamburger Menu
 */
function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const navLeft = document.querySelector('.nav-left');
    if (!toggle || !navLeft) return;

    // Create overlay dynamically
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    overlay.id = 'navOverlay';
    document.body.appendChild(overlay);

    function openMenu() {
        toggle.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        navLeft.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        navLeft.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => {
        navLeft.classList.contains('open') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    // Close menu when viewport grows past mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMenu();
    });
}

/**
 * Live Chat Widget
 */
function initLiveChat() {
    if (document.getElementById('supportLauncher')) return;

    const widget = document.createElement('div');
    widget.className = 'support-widget';
    widget.innerHTML = `
        <button class="support-launcher" id="supportLauncher" aria-label="Open live support" aria-expanded="false">
            <i class="fas fa-comment-dots"></i>
        </button>
        <div class="support-panel" id="supportPanel" aria-hidden="true">
            <div class="support-header">
                <div>
                    <h4>APEX Live Support</h4>
                    <p>Online now</p>
                </div>
                <button class="support-close" id="supportClose" aria-label="Close live support">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="support-messages" id="supportMessages"></div>
            <div class="support-quick-actions" id="supportQuickActions">
                <button type="button" data-message="Track my order">Track order</button>
                <button type="button" data-message="Help me pick a rod">Choose a rod</button>
                <button type="button" data-message="Warranty support">Warranty</button>
            </div>
            <form class="support-input" id="supportForm">
                <input type="text" id="supportInput" placeholder="Type your message..." maxlength="220" required>
                <button type="submit" aria-label="Send message">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </form>
        </div>
    `;

    document.body.appendChild(widget);

    const launcher = document.getElementById('supportLauncher');
    const panel = document.getElementById('supportPanel');
    const closeBtn = document.getElementById('supportClose');
    const messages = document.getElementById('supportMessages');
    const quickActions = document.getElementById('supportQuickActions');
    const form = document.getElementById('supportForm');
    const input = document.getElementById('supportInput');

    if (!launcher || !panel || !closeBtn || !messages || !quickActions || !form || !input) return;

    function addMessage(text, sender = 'support') {
        const item = document.createElement('div');
        item.className = `support-message ${sender}`;
        item.textContent = text;
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
    }

    function getAutoReply(message) {
        const lower = message.toLowerCase();

        if (lower.includes('track') || lower.includes('order')) {
            return 'Share your order number and email, and we can help track it right away.';
        }

        if (lower.includes('rod') || lower.includes('bass') || lower.includes('trout')) {
            return 'For all-around performance, start with our APEX Elite Casting Rod. If you tell me your target species, I can narrow it down.';
        }

        if (lower.includes('warranty') || lower.includes('return')) {
            return 'Our team can guide you through warranty or returns. Send your order number and a quick issue description.';
        }

        if (lower.includes('reel') || lower.includes('line') || lower.includes('lure')) {
            return 'Great choice. Tell me your budget and fishing style, and I’ll suggest the best setup.';
        }

        return 'Thanks for reaching out. We can help with gear recommendations, order tracking, and warranty support.';
    }

    function openChat() {
        panel.classList.add('active');
        launcher.setAttribute('aria-expanded', 'true');
        panel.setAttribute('aria-hidden', 'false');
        input.focus();
    }

    function closeChat() {
        panel.classList.remove('active');
        launcher.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-hidden', 'true');
    }

    function handleUserMessage(text) {
        const clean = text.trim();
        if (!clean) return;

        addMessage(clean, 'user');
        input.value = '';

        setTimeout(() => {
            addMessage(getAutoReply(clean), 'support');
        }, 550);
    }

    addMessage('Hi! Need help picking gear, tracking an order, or warranty support?', 'support');

    launcher.addEventListener('click', () => {
        panel.classList.contains('active') ? closeChat() : openChat();
    });

    closeBtn.addEventListener('click', closeChat);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('active')) {
            closeChat();
        }
    });

    quickActions.addEventListener('click', (e) => {
        const target = e.target.closest('button[data-message]');
        if (!target) return;

        handleUserMessage(target.dataset.message || '');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleUserMessage(input.value);
    });
}

/**
 * Header Scroll Effects
 */
function initHeader() {
    const header = document.getElementById('mainHeader');
    const announcementBar = document.querySelector('.announcement-bar');
    
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when scrolling down
        if (currentScroll > 50) {
            header.classList.add('scrolled');
            if (announcementBar) {
                announcementBar.style.transform = 'translateY(-100%)';
            }
        } else {
            header.classList.remove('scrolled');
            if (announcementBar) {
                announcementBar.style.transform = 'translateY(0)';
            }
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Hero Slider
 */
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dots .dot');
    const prevBtn = document.querySelector('.hero-nav-btn.prev');
    const nextBtn = document.querySelector('.hero-nav-btn.next');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        // Handle index bounds
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        
        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) slide.classList.add('active');
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) dot.classList.add('active');
        });
        
        currentSlide = index;
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Auto play
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 6000);
    }
    
    function stopAutoPlay() {
        clearInterval(slideInterval);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            showSlide(index);
            startAutoPlay();
        });
    });
    
    // Start auto play
    startAutoPlay();
    
    // Pause on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoPlay);
        heroSection.addEventListener('mouseleave', startAutoPlay);
    }
}

/**
 * Search Functionality
 */
function initSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.querySelector('.search-input');
    
    if (!searchToggle || !searchOverlay) return;
    
    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => searchInput?.focus(), 300);
    });
    
    searchClose?.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close on backdrop click
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Product Filters
 */
function normalizeProductCategory(category) {
    if (!category) return 'all';

    const normalized = category.toLowerCase().trim();
    const categoryMap = {
        all: 'all',
        rods: 'rods',
        rod: 'rods',
        spinning: 'rods',
        casting: 'rods',
        flyrod: 'rods',
        surf: 'rods',
        ice: 'rods',
        reels: 'reels',
        reel: 'reels',
        'spinning-reels': 'reels',
        baitcasting: 'reels',
        'fly-reels': 'reels',
        conventional: 'reels',
        trolling: 'reels',
        lures: 'lures',
        crankbaits: 'lures',
        'soft-plastics': 'lures',
        spinnerbaits: 'lures',
        topwater: 'lures',
        jigs: 'lures',
        swimbaits: 'lures',
        line: 'line',
        braided: 'line',
        fluorocarbon: 'line',
        monofilament: 'line',
        leaders: 'line',
        hooks: 'line',
        swivels: 'line',
        apparel: 'apparel'
    };

    return categoryMap[normalized] || normalized;
}

function getProductCategoryLabel(category) {
    const labels = {
        all: 'All Products',
        rods: 'Rods',
        reels: 'Reels',
        lures: 'Lures',
        line: 'Line & Terminal',
        apparel: 'Apparel'
    };

    return labels[category] || 'All Products';
}

function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const categoryInputs = document.querySelectorAll('.filters-sidebar input[name="product-category"]');
    const productCards = document.querySelectorAll('.product-card');
    const productsGrid = document.querySelector('.products-grid');
    const productsCount = document.querySelector('.products-count');
    const pageTitle = document.querySelector('.page-title');
    const breadcrumbCurrent = document.querySelector('.breadcrumb span:last-child');
    const searchParams = new URLSearchParams(window.location.search);
    const initialCategory = normalizeProductCategory(searchParams.get('category') || searchParams.get('cat'));

    // Filter section collapse
    const filterSections = document.querySelectorAll('.filter-section h4');
    filterSections.forEach(section => {
        section.addEventListener('click', () => {
            section.parentElement.classList.toggle('collapsed');
            const options = section.nextElementSibling;
            if (options) {
                options.style.display = section.parentElement.classList.contains('collapsed') ? 'none' : 'flex';
            }
        });
    });

    if (productCards.length === 0 || !productsGrid) return;

    let emptyState = document.querySelector('.products-empty-state');
    if (!emptyState) {
        emptyState = document.createElement('div');
        emptyState.className = 'products-empty-state';
        emptyState.innerHTML = `
            <h3>No products in this category yet</h3>
            <p>Try another category or browse the full collection.</p>
            <a href="products.html" class="btn btn-primary">View All Products</a>
        `;
        productsGrid.insertAdjacentElement('afterend', emptyState);
    }

    function updateProductsMeta(category, visibleCount) {
        const label = getProductCategoryLabel(category);

        if (productsCount) {
            productsCount.innerHTML = visibleCount > 0
                ? `Showing <strong>1-${visibleCount}</strong> of <strong>${visibleCount}</strong> products in <strong>${label}</strong>`
                : `Showing <strong>0</strong> of <strong>0</strong> products in <strong>${label}</strong>`;
        }

        if (pageTitle) {
            pageTitle.textContent = category === 'all' ? 'ALL PRODUCTS' : label.toUpperCase();
        }

        if (breadcrumbCurrent) {
            breadcrumbCurrent.textContent = label;
        }
    }

    function syncCategoryControls(category) {
        filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === category);
        });

        categoryInputs.forEach(input => {
            const isActive = input.value === category;
            input.checked = isActive;
            input.closest('.filter-option')?.classList.toggle('active', isActive);
        });
    }

    function applyProductFilter(filter, updateUrl = true) {
        const normalizedFilter = normalizeProductCategory(filter);
        let visibleCount = 0;

        syncCategoryControls(normalizedFilter);

        productCards.forEach(card => {
            const shouldShow = normalizedFilter === 'all' || card.dataset.category === normalizedFilter;
            card.style.display = shouldShow ? '' : 'none';

            if (shouldShow) {
                card.style.animation = 'fadeIn 0.5s ease';
                visibleCount += 1;
            }
        });

        updateProductsMeta(normalizedFilter, visibleCount);

        const showEmptyState = visibleCount === 0;
        emptyState.classList.toggle('active', showEmptyState);
        productsGrid.classList.toggle('is-empty', showEmptyState);

        if (updateUrl) {
            const nextUrl = normalizedFilter === 'all'
                ? 'products.html'
                : `products.html?category=${normalizedFilter}`;
            window.history.replaceState({}, '', nextUrl);
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            applyProductFilter(btn.dataset.filter);
        });
    });

    categoryInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (!input.checked) {
                input.checked = true;
                return;
            }

            applyProductFilter(input.value);
        });
    });

    applyProductFilter(initialCategory || 'all', false);
}

/**
 * Product Cards Interactions
 */
function initProductCards() {
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    const addToCartBtns = document.querySelectorAll('.btn-add-cart');
    
    // Wishlist toggle
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            btn.classList.toggle('active');
            
            const icon = btn.querySelector('i');
            if (btn.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                showNotification('Added to wishlist!', 'success');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showNotification('Removed from wishlist', 'info');
            }
        });
    });
    
    // Add to cart
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Get product info
            const card = btn.closest('.product-card');
            const title = card.querySelector('.product-title a').textContent;
            const price = card.querySelector('.current-price').textContent;
            const image = card.querySelector('.primary-img').src;
            
            // Add to cart
            addToCart({
                title,
                price,
                image,
                quantity: 1
            });
            
            // Button animation
            const originalText = btn.textContent;
            btn.innerHTML = '<i class="fas fa-check"></i> Added!';
            btn.style.background = '#00C853';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 2000);
        });
    });
}

/**
 * Cart Functionality
 */
let cart = JSON.parse(localStorage.getItem('apexCart')) || [];

function initCart() {
    updateCartCount();
    renderCartSidebar();
    
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartClose = document.getElementById('cartClose');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (!cartIcon || !cartSidebar) return;
    
    // Open cart
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        openCartSidebar();
    });
    
    // Close cart
    cartClose?.addEventListener('click', closeCartSidebar);
    cartOverlay?.addEventListener('click', closeCartSidebar);
    
    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartSidebar.classList.contains('active')) {
            closeCartSidebar();
        }
    });
}

function openCartSidebar() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar?.classList.add('active');
    cartOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar?.classList.remove('active');
    cartOverlay?.classList.remove('active');
    document.body.style.overflow = '';
}

function addToCart(product) {
    const existingItem = cart.find(item => item.title === product.title);
    
    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cart.push(product);
    }
    
    saveCart();
    updateCartCount();
    renderCartSidebar();
    openCartSidebar();
    showNotification(`${product.title} added to cart!`, 'success');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    renderCartSidebar();
    renderCartPage();
}

function updateCartItemQuantity(index, quantity) {
    if (quantity <= 0) {
        removeFromCart(index);
        return;
    }
    
    cart[index].quantity = quantity;
    saveCart();
    updateCartCount();
    renderCartSidebar();
    renderCartPage();
}

function saveCart() {
    localStorage.setItem('apexCart', JSON.stringify(cart));
}

function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    countElements.forEach(el => {
        el.textContent = totalItems;
    });
}

function getCartTotal() {
    return cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        return sum + (price * item.quantity);
    }, 0);
}

function renderCartSidebar() {
    const content = document.querySelector('.cart-sidebar-content');
    const subtotal = document.querySelector('.subtotal-amount');
    
    if (!content) return;
    
    if (cart.length === 0) {
        content.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <a href="products.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
    } else {
        content.innerHTML = cart.map((item, index) => `
            <div class="cart-sidebar-item" style="display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid rgba(0,0,0,0.1);">
                <img src="${item.image}" alt="${item.title}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                <div style="flex: 1;">
                    <h4 style="font-size: 0.9375rem; font-weight: 600; margin-bottom: 0.25rem;">${item.title}</h4>
                    <p style="font-size: 0.875rem; color: #666; margin-bottom: 0.5rem;">${item.price}</p>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <button onclick="updateCartItemQuantity(${index}, ${item.quantity - 1})" style="width: 24px; height: 24px; border: 1px solid #ddd; border-radius: 4px; background: white; cursor: pointer;">-</button>
                        <span style="font-size: 0.875rem;">${item.quantity}</span>
                        <button onclick="updateCartItemQuantity(${index}, ${item.quantity + 1})" style="width: 24px; height: 24px; border: 1px solid #ddd; border-radius: 4px; background: white; cursor: pointer;">+</button>
                        <button onclick="removeFromCart(${index})" style="margin-left: auto; font-size: 0.75rem; color: #999; background: none; border: none; cursor: pointer; text-decoration: underline;">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    if (subtotal) {
        subtotal.textContent = '$' + getCartTotal().toFixed(2);
    }
}

function renderCartPage() {
    const cartItems = document.querySelector('.cart-items');
    const cartCountLabel = document.querySelector('.cart-count-label');
    const summarySubtotal = document.querySelector('.summary-row .value');
    const summaryTotal = document.querySelector('.summary-row.total .value');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty" style="text-align: center; padding: 4rem 2rem;">
                <i class="fas fa-shopping-cart" style="font-size: 4rem; color: #ccc; margin-bottom: 1.5rem;"></i>
                <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">Your cart is empty</h3>
                <p style="color: #666; margin-bottom: 2rem;">Looks like you haven't added anything to your cart yet.</p>
                <a href="products.html" class="btn btn-primary btn-large">Start Shopping</a>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-info">
                    <h3>${item.title}</h3>
                    <p class="cart-item-meta">Size: 7'0" | Color: Black</p>
                    <div class="cart-item-actions">
                        <div class="cart-qty">
                            <button onclick="updateCartItemQuantity(${index}, ${item.quantity - 1})">-</button>
                            <input type="number" value="${item.quantity}" min="1" onchange="updateCartItemQuantity(${index}, parseInt(this.value))">
                            <button onclick="updateCartItemQuantity(${index}, ${item.quantity + 1})">+</button>
                        </div>
                        <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
                    </div>
                </div>
                <div class="cart-item-price">
                    <span class="price">${item.price}</span>
                </div>
            </div>
        `).join('');
    }
    
    if (cartCountLabel) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountLabel.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
    }
    
    // Update summary
    const total = getCartTotal();
    document.querySelectorAll('.subtotal-value').forEach(el => {
        el.textContent = '$' + total.toFixed(2);
    });
    document.querySelectorAll('.total-value').forEach(el => {
        el.textContent = '$' + total.toFixed(2);
    });
}

/**
 * Product Gallery
 */
function initGallery() {
    const mainImage = document.querySelector('.gallery-main img');
    const thumbs = document.querySelectorAll('.gallery-thumb');
    
    if (!mainImage || thumbs.length === 0) return;
    
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Update active state
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            
            // Update main image
            const newSrc = thumb.querySelector('img').src;
            mainImage.style.opacity = 0;
            
            setTimeout(() => {
                mainImage.src = newSrc;
                mainImage.style.opacity = 1;
            }, 200);
        });
    });
    
    // Zoom functionality
    const zoomBtn = document.querySelector('.gallery-zoom');
    if (zoomBtn) {
        zoomBtn.addEventListener('click', () => {
            // Open modal with zoomed image
            const modal = document.getElementById('quickViewModal');
            if (modal) {
                modal.querySelector('.quick-view-content').innerHTML = `
                    <img src="${mainImage.src}" style="width: 100%; max-height: 80vh; object-fit: contain;">
                `;
                modal.classList.add('active');
            }
        });
    }
}

/**
 * Product Tabs
 */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length === 0) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // Update active states
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tabId)?.classList.add('active');
        });
    });
}

/**
 * Quantity Selectors
 */
function initQuantitySelectors() {
    const qtySelectors = document.querySelectorAll('.quantity-selector');
    
    qtySelectors.forEach(selector => {
        const minusBtn = selector.querySelector('.qty-btn:first-child');
        const plusBtn = selector.querySelector('.qty-btn:last-child');
        const input = selector.querySelector('.qty-input');
        
        if (!minusBtn || !plusBtn || !input) return;
        
        minusBtn.addEventListener('click', () => {
            const currentVal = parseInt(input.value) || 1;
            if (currentVal > 1) {
                input.value = currentVal - 1;
            }
        });
        
        plusBtn.addEventListener('click', () => {
            const currentVal = parseInt(input.value) || 1;
            input.value = currentVal + 1;
        });
        
        input.addEventListener('change', () => {
            const val = parseInt(input.value);
            if (isNaN(val) || val < 1) {
                input.value = 1;
            }
        });
    });
    
    // Add to cart from detail page
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const title = document.querySelector('.product-detail-title')?.textContent || 'Product';
            const price = document.querySelector('.product-detail-price .current-price')?.textContent || '$0';
            const image = document.querySelector('.gallery-main img')?.src || '';
            const quantity = parseInt(document.querySelector('.qty-input')?.value) || 1;
            
            addToCart({ title, price, image, quantity });
            
            // Button animation
            const originalText = addToCartBtn.textContent;
            addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Added to Cart!';
            addToCartBtn.style.background = '#00C853';
            
            setTimeout(() => {
                addToCartBtn.textContent = originalText;
                addToCartBtn.style.background = '';
            }, 2500);
        });
    }
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll(
        '.category-card, .product-card, .tech-card, .team-member, .value-card'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Notification System
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Styles
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        padding: '16px 24px',
        background: type === 'success' ? '#00C853' : type === 'error' ? '#FF3D00' : '#0066FF',
        color: 'white',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.9375rem',
        fontWeight: '500',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        zIndex: '9999',
        animation: 'slideInUp 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
`;
document.head.appendChild(notificationStyles);

/**
 * Product Options
 */
document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const group = btn.closest('.option-values');
        group.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update selected value display
        const label = btn.closest('.option-group').querySelector('.option-label span');
        if (label) {
            label.textContent = btn.textContent || btn.getAttribute('title');
        }
    });
});

/**
 * Modal Functionality
 */
document.querySelectorAll('.modal-close, .modal-backdrop').forEach(el => {
    el.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    });
});

/**
 * Newsletter Form
 */
document.querySelectorAll('.newsletter-form, .promo-form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        
        if (input && input.value) {
            showNotification('Thanks for subscribing! Check your email for your discount code.', 'success');
            input.value = '';
        }
    });
});

/**
 * Smooth Scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Lazy Loading Images
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize cart page if on cart page
if (document.querySelector('.cart-page')) {
    renderCartPage();
}
