import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useOutletContext } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowRight, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Select from '../components/Select';

import main1 from '../assets/main1.jpg';
import main2 from '../assets/main2.jpg';
import main3 from '../assets/main3.jpg';
import main4 from '../assets/main4.jpg';
import main5 from '../assets/main5.jpg';
import main6 from '../assets/main6.jpg';
import main7 from '../assets/main7.jpg';



const ALL_PRODUCTS = [
  { id: 201, name: 'Golden Teacher Magic Mushrooms (AAA)', price: 49.99, image: main5, badge: 'TOP RATED', rating: 5, category: 'PSYCHEDELICS', specs: [{ val: '3.1g', label: 'Prebiotics' }, { val: '0g', label: 'Sugar' }, { val: '3.1g', label: 'Mushroom' }] },
  { id: 202, name: 'Blue Meanie High-Potency Shrooms', price: 59.99, image: main6, badge: 'HIGH POTENCY', rating: 4.9, category: 'PSYCHEDELICS', specs: [{ val: '4.5g', label: 'Prebiotics' }, { val: '0g', label: 'Sugar' }, { val: '4.5g', label: 'Mushroom' }] },
  { id: 203, name: 'Premium Mind-Focus Microdose Caps', price: 39.99, image: main7, badge: 'BEST SELLER', rating: 4.8, category: 'MICRODOSE', specs: [{ val: '150mg', label: 'Active Dose' }, { val: '0g', label: 'Sugar' }, { val: '30 Caps', label: 'Servings' }] },
  { id: 204, name: 'Freeze Dried Amazonian Cryo-Shrooms', price: 64.99, image: main1, badge: 'CRYO RESERVE', rating: 5, category: 'FREEZE DRIED', specs: [{ val: '3.5g', label: 'Prebiotics' }, { val: '0g', label: 'Sugar' }, { val: 'Cryo', label: 'Mushroom' }] },
  { id: 205, name: 'Penis Envy Premium Grade Capsules', price: 69.99, image: main3, badge: 'HOT SELLER', rating: 4.9, category: 'CAPSULES', specs: [{ val: '200mg', label: 'Active Dose' }, { val: '0g', label: 'Sugar' }, { val: '24 Caps', label: 'Servings' }] },
  { id: 206, name: 'Albino A+ Exotic Organic Cultivation', price: 54.99, image: main2, badge: 'EXOTIC SPECIES', rating: 4.8, category: 'PSYCHEDELICS', specs: [{ val: '3.0g', label: 'Prebiotics' }, { val: '0g', label: 'Sugar' }, { val: '3.0g', label: 'Mushroom' }] },
  { id: 207, name: 'Gourmet Psilocybin Belgian Dark Chocolate', price: 34.99, image: main4, badge: 'HANDCRAFTED', rating: 4.7, category: 'EDIBLES', specs: [{ val: '3.1g', label: 'Prebiotics' }, { val: '2g', label: 'Sugar' }, { val: '72%', label: 'Belgian Cocoa' }] },
  { id: 208, name: 'Microdose Focus Blend (Trinity Edition)', price: 44.99, image: main7, badge: 'COGNITIVE BOOST', rating: 4.9, category: 'MICRODOSE', specs: [{ val: '120mg', label: 'Active Dose' }, { val: '0g', label: 'Sugar' }, { val: '30 Caps', label: 'Servings' }] },
  { id: 209, name: 'Golden Teacher Magic Mushrooms (AAA) On Sale', price: 39.99, originalPrice: 49.99, image: main5, badge: '20% OFF', rating: 5, category: 'PSYCHEDELICS', specs: [{ val: '3.1g', label: 'Prebiotics' }, { val: '0g', label: 'Sugar' }, { val: '3.1g', label: 'Mushroom' }] },
  { id: 210, name: 'Gourmet Psilocybin Belgian Dark Chocolate On Sale', price: 27.99, originalPrice: 34.99, image: main4, badge: '20% OFF', rating: 4.7, category: 'EDIBLES', specs: [{ val: '3.1g', label: 'Prebiotics' }, { val: '2g', label: 'Sugar' }, { val: '72%', label: 'Belgian Cocoa' }] },
];

const CATEGORIES = ['All', 'PSYCHEDELICS', 'MICRODOSE', 'FREEZE DRIED', 'CAPSULES', 'EDIBLES'];

export default function ProductList() {
  const { handleAddToCart } = useOutletContext() || {};

  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Filter Drawer State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(150);
  const [stockStatus, setStockStatus] = useState({ onSale: false, inStock: false });

  // Filtering
  const filteredProducts = ALL_PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price <= priceRange;
    const matchesOnSale = stockStatus.onSale ? !!product.originalPrice : true;

    return matchesCategory && matchesSearch && matchesPrice && matchesOnSale;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // default
  });

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setPriceRange(150);
    setStockStatus({ onSale: false, inStock: false });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.92, rotateX: 12, filter: 'blur(12px)' },
    show: { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.10, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-0 pb-0 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FA0C83]/[0.02] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] rounded-full bg-[#01CBDF]/[0.02] blur-[150px] pointer-events-none" />

      {/* PAGE HEADER CARD */}
      <div className="max-w-[87%] mx-auto px-2 sm:px-4 lg:px-4 pt-24 pb-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl mb-5 p-6 shadow-sm"
        >
          <h1 className="text-2xl md:text-3xl font-black text-white font-display mb-2">
            Shop Mushroom
          </h1>

          <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-zinc-500 mb-2.5">
            <Link to="/" className="text-[#FA0C83] hover:text-[#FA0C83]/80 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-300">Shop Mushroom</span>
          </div>

          <div className="text-sm text-zinc-400 space-y-3 font-sans leading-relaxed max-w-none">
            <p>
              Discover premium-quality mushrooms carefully selected to support your mind, body, and lifestyle. At Shroom Express, we specialize in sourcing functional and specialty mushrooms that deliver real benefits from boosting immunity and focus to encouraging relaxation and creativity.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filter Drawer Overlay and Slide-out Drawer */}
          {typeof document !== 'undefined' && createPortal(
            <>
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsFilterOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isFilterOpen && (
                  <motion.aside
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed top-0 left-0 h-full w-[320px] max-w-[85vw] bg-zinc-900 border-r border-zinc-800 shadow-2xl z-[9999] flex flex-col font-sans"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
                      <h3 className="text-lg font-display font-black tracking-widest text-[#FA0C83] uppercase">Filter</h3>
                      <button onClick={() => setIsFilterOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">

                      {/* Search */}
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">Search</h4>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 text-sm font-medium text-white px-4 py-3 rounded-lg outline-none focus:border-[#FA0C83] transition-colors placeholder:text-zinc-500"
                          />
                          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        </div>
                      </div>

                      {/* Stock Status */}
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">Stock Status</h4>
                        <div className="space-y-3">
                          <div
                            onClick={() => setStockStatus(prev => ({ ...prev, onSale: !prev.onSale }))}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${stockStatus.onSale ? 'bg-[#FA0C83] border-[#FA0C83]' : 'border-zinc-700 group-hover:border-zinc-500 bg-transparent'}`}>
                              {stockStatus.onSale && <div className="w-2 h-2 bg-white rounded-sm" />}
                            </div>
                            <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">On sale</span>
                          </div>
                          <div
                            onClick={() => setStockStatus(prev => ({ ...prev, inStock: !prev.inStock }))}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${stockStatus.inStock ? 'bg-[#FA0C83] border-[#FA0C83]' : 'border-zinc-700 group-hover:border-zinc-500 bg-transparent'}`}>
                              {stockStatus.inStock && <div className="w-2 h-2 bg-white rounded-sm" />}
                            </div>
                            <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">In stock</span>
                          </div>
                        </div>
                      </div>

                      {/* Price Slider */}
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">Filter By Price</h4>
                        <div className="space-y-4">
                          <input
                            type="range"
                            min="0"
                            max="150"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            className="w-full accent-[#FA0C83] h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer outline-none"
                          />
                          <div className="flex items-center justify-between text-xs font-bold text-zinc-500">
                            <span>$0</span>
                            <span className="text-[#FA0C83]">${priceRange}</span>
                          </div>
                        </div>
                      </div>

                      {/* Product Categories */}
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">Product Categories</h4>
                        <ul className="space-y-3">
                          {CATEGORIES.map((cat) => (
                            <li key={cat}>
                              <div
                                onClick={() => setSelectedCategory(cat)}
                                className="flex items-center gap-3 cursor-pointer group"
                              >
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedCategory === cat ? 'bg-[#FA0C83] border-[#FA0C83]' : 'border-zinc-700 group-hover:border-zinc-500 bg-transparent'}`}>
                                  {selectedCategory === cat && <div className="w-2 h-2 bg-white rounded-sm" />}
                                </div>
                                <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">
                                  {cat === 'All' ? 'All Products' : cat}
                                </span>
                                <span className="ml-auto text-[10px] text-zinc-500 font-bold">
                                  {cat === 'All' ? ALL_PRODUCTS.length : ALL_PRODUCTS.filter(p => p.category === cat).length}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>

                    {/* Footer Buttons */}
                    <div className="p-6 border-t border-zinc-800 flex items-center gap-3">
                      <button
                        onClick={handleResetFilters}
                        className="flex-1 py-3.5 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-400 text-xs font-black uppercase tracking-widest hover:bg-zinc-800 hover:text-white transition-colors"
                      >
                        Reset
                      </button>
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="flex-1 py-3.5 rounded-xl bg-[#FA0C83] hover:bg-[#FA0C83]/90 text-white text-xs font-black uppercase tracking-widest transition-colors shadow-[0_0_15px_rgba(250,12,131,0.3)]"
                      >
                        Apply
                      </button>
                    </div>
                  </motion.aside>
                )}
              </AnimatePresence>
            </>,
            document.body
          )}

          {/* Main Content */}
          <div className="w-full space-y-6">

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-zinc-800/50 pb-6 mb-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="relative flex items-center gap-2 bg-[#FA0C83] hover:bg-[#FA0C83]/90 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm"
                >
                  <SlidersHorizontal className="w-4 h-4" />

                  {/* Active Filters Badge */}
                  {((selectedCategory !== 'All' ? 1 : 0) + (searchQuery ? 1 : 0) + (stockStatus.onSale ? 1 : 0) + (stockStatus.inStock ? 1 : 0) > 0) && (
                    <span className="flex items-center justify-center w-5 h-5 bg-white text-[#FA0C83] text-[11px] font-black rounded-full ml-1 leading-none pt-[1px]">
                      {(selectedCategory !== 'All' ? 1 : 0) + (searchQuery ? 1 : 0) + (stockStatus.onSale ? 1 : 0) + (stockStatus.inStock ? 1 : 0)}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex items-center w-56">
                <Select
                  options={[
                    { value: 'default', label: 'Sort by popularity' },
                    { value: 'rating', label: 'Sort by average rating' },
                    { value: 'latest', label: 'Sort by latest' },
                    { value: 'price-low', label: 'Sort by price: low to high' },
                    { value: 'price-high', label: 'Sort by price: high to low' }
                  ]}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  placeholder="Sort by popularity"
                  customStyle="w-full"
                />
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <motion.div
                className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-6"}
                initial="hidden"
                animate="show"
              >
                {filteredProducts.map((product, idx) => (
                  viewMode === 'grid' ? (
                    <ProductCard
                      key={product.id}
                      product={product}
                      variants={cardVariants}
                      handleAddToCart={handleAddToCart}
                    />
                  ) : (
                    /* LIST VIEW ITEM */
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="flex flex-col md:flex-row bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-[#FA0C83] transition-all duration-300"
                    >
                      <div className="md:w-1/3 relative h-64 md:h-auto overflow-hidden group">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        {product.badge && (
                          <span className="absolute top-4 left-4 bg-[#FA0C83] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full z-10">
                            {product.badge}
                          </span>
                        )}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-0" />
                      </div>

                      <div className="md:w-2/3 p-6 flex flex-col justify-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#FA0C83] mb-2">{product.category}</span>
                        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-3">{product.name}</h3>

                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xl font-black text-white">${product.price.toFixed(2)}</span>
                          {product.originalPrice && (
                            <span className="text-sm font-bold text-zinc-400 line-through">${product.originalPrice.toFixed(2)}</span>
                          )}
                        </div>

                        <p className="text-zinc-600 text-sm mb-6 leading-relaxed">
                          Premium quality magic mushrooms cultivated with precision. Experience cognitive enhancement, deep focus, and organic purity in every dose.
                        </p>

                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleAddToCart && handleAddToCart(product)}
                            className="bg-[#111] hover:bg-[#FA0C83] text-white font-black text-xs px-6 py-3 rounded-lg uppercase tracking-widest transition-colors flex items-center gap-2"
                          >
                            Add to Bag
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-24 bg-zinc-900 border border-dashed border-zinc-800 rounded-3xl shadow-sm">
                <Search className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">No products found</h3>
                <p className="text-zinc-500 text-xs mb-4">Try adjusting your category or search query.</p>
                <button
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="px-6 py-2.5 rounded-full border border-zinc-700/80 text-xs font-black uppercase tracking-widest hover:text-white hover:bg-[#FA0C83] hover:border-[#FA0C83] transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
      {/* WAVY DIVIDER: Page to Footer */}
    </div>
  )
}
