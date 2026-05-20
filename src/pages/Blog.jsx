import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, User, Clock, ArrowRight, Search, Sparkles, BookOpen, ChevronRight, MessageSquare } from 'lucide-react'
import main1 from '../assets/main1.jpg'
import main2 from '../assets/main2.jpg'
import main3 from '../assets/main3.jpg'
import main4 from '../assets/main4.jpg'
import main5 from '../assets/main5.jpg'
import main6 from '../assets/main6.jpg'

// Floating particle component for the hero section
function HeroParticle({ x, y, size, color, duration, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none z-10"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: `${x}%`,
        top: `${y}%`,
        filter: 'blur(1px)'
      }}
      animate={{
        y: [0, -35, 0],
        x: [0, 8, 0],
        opacity: [0.08, 0.45, 0.08],
        scale: [0.9, 1.25, 0.9]
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeInOut'
      }}
    />
  )
}


const CATEGORIES = ['All', 'Microdosing', 'Science & Research', 'Guides', 'Lifestyle']
const TAGS = ['Psilocybin', 'Microdosing', 'Health', 'Strains', 'Edibles', 'Research', 'Guide']

const BLOG_POSTS = [
  {
    id: 1,
    title: 'The Ultimate Guide to Microdosing: Schedules and Benefits',
    excerpt: 'Explore the revolutionary practice of microdosing psilocybin. Learn about the Fadiman protocol, the Stamets Stack, and how sub-perceptual doses can enhance daily productivity and mood.',
    content: 'Microdosing has taken the wellness and tech worlds by storm. Rather than seeking a hallucinogenic journey, practitioners consume small, sub-perceptual amounts of psilocybin—usually between 0.1g and 0.3g of dried mushrooms. Proponents report heightened creativity, lower anxiety, improved focus, and a general state of flow. In this guide, we break down the protocols (like taking it every third day or four days on, three days off) and safe practices for beginners.',
    category: 'Microdosing',
    tags: ['Microdosing', 'Health', 'Guide'],
    image: main5,
    date: 'May 18, 2026',
    month: 'May 2026',
    author: 'Dr. Evelyn Carter',
    readTime: '6 min read',
    views: 1240,
    featured: true
  },
  {
    id: 2,
    title: 'Psilocybin and Mental Health: What Modern Science Tells Us',
    excerpt: 'Leading universities are publishing groundbreaking studies on how psilocybin assisted therapy is showing unprecedented success rates for treatment-resistant depression and anxiety.',
    content: 'Recent clinical trials from Johns Hopkins, Imperial College London, and other top-tier institutions have shown that psilocybin-assisted therapy can produce immediate and long-lasting reductions in depressive symptoms. By temporarily quietening the default mode network (DMN), psilocybin allows the brain to form new neural connections, breaking cycles of rumination and negative thinking.',
    category: 'Science & Research',
    tags: ['Psilocybin', 'Health', 'Research'],
    image: main6,
    date: 'May 12, 2026',
    month: 'May 2026',
    author: 'Marcus Vance',
    readTime: '8 min read',
    views: 980,
    featured: false
  },
  {
    id: 3,
    title: 'How to Store Magic Mushrooms to Keep Them Fresh',
    excerpt: 'Proper storage is crucial to preserve the potency of psilocybin. Discover the best practices for short-term and long-term storage, including freeze-drying and vacuum sealing.',
    content: 'To maintain the active psilocybin compounds in your magic mushrooms, you must protect them from four primary enemies: heat, light, moisture, and oxygen. For short-term storage, keeping them in an airtight glass jar with a silica gel pack in a dark cupboard is ideal. For long-term preservation, ensuring they are cracker-dry and vacuum-sealing them in light-proof bags is the gold standard.',
    category: 'Guides',
    tags: ['Guide', 'Strains'],
    image: main1,
    date: 'May 05, 2026',
    month: 'May 2026',
    author: 'Sarah Jenkins',
    readTime: '4 min read',
    views: 450,
    featured: false
  },
  {
    id: 4,
    title: 'Exploring Shroom Strains: Golden Teacher vs. Penis Envy',
    excerpt: 'Not all cubensis strains are created equal. We compare the gentle, introspective guidance of Golden Teachers with the legendary intensity and visual palette of Penis Envy.',
    content: 'Golden Teachers are the quintessential entry strain—known for their gentle, philosophical lessons and moderate potency. Penis Envy, on the other hand, is a mutated cultivar containing significantly higher concentrations of psilocin and psilocybin. Beginners should approach Penis Envy with extra caution, as doses under 1.5g can trigger intense hallucinogenic experiences.',
    category: 'Guides',
    tags: ['Strains', 'Psilocybin'],
    image: main2,
    date: 'April 28, 2026',
    month: 'April 2026',
    author: 'Chef Shroomy',
    readTime: '5 min read',
    views: 1120,
    featured: false
  },
  {
    id: 5,
    title: 'The Rise of Shroom Chocolates and Gummies',
    excerpt: 'Edibles are transforming the magic mushroom market. Learn about dosage precision, taste masking, and why organic fruit gummies are becoming the preferred entry point for beginners.',
    content: 'For many, the bitter taste and earthy texture of raw mushrooms are a major barrier. Infused edibles like chocolates and gummies solve this by masking the flavor completely and offering precise, pre-measured dosages. This makes microdosing and light recreational trips much more approachable, especially for users wanting a discrete and delicious experience.',
    category: 'Lifestyle',
    tags: ['Edibles', 'Lifestyle'],
    image: main3,
    date: 'April 20, 2026',
    month: 'April 2026',
    author: 'Luna Bennett',
    readTime: '5 min read',
    views: 890,
    featured: false
  },
  {
    id: 6,
    title: 'Flow States & Creativity: Elevating Workspace Performance',
    excerpt: 'Discover how micro-doses of natural adaptogens and psilocybin interact with the brain’s default mode network to unlock lateral thinking and reduce mental fatigue.',
    content: 'Many creatives and professionals use microdosing as a tool to access flow states—periods of intense, effortless concentration where self-consciousness fades. Scientific hypotheses suggest that sub-perceptual psilocybin boosts serotonin transmission, helping quiet the inner critic and allowing for more novel connections and rapid problem-solving.',
    category: 'Lifestyle',
    tags: ['Microdosing', 'Lifestyle'],
    image: main4,
    date: 'April 15, 2026',
    month: 'April 2026',
    author: 'Dr. Evelyn Carter',
    readTime: '7 min read',
    views: 670,
    featured: false
  }
]

const MOCK_COMMENTS = [
  {
    id: 1,
    author: 'Emma Watson',
    postTitle: 'Exploring Shroom Strains',
    content: 'Golden Teachers really changed my perspective on self-guided anxiety therapy!'
  },
  {
    id: 2,
    author: 'Liam Vance',
    postTitle: 'The Ultimate Guide to Microdosing',
    content: 'Been following the Fadiman protocol for 3 weeks now. My focus is off the charts!'
  },
  {
    id: 3,
    author: 'Sophia Chen',
    postTitle: 'The Rise of Shroom Chocolates',
    content: 'Those organic gummies look so delicious and convenient. Highly recommend.'
  }
]

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('All')
  const [selectedTag, setSelectedTag] = useState('All')
  const [activePost, setActivePost] = useState(null)

  // Sidebar tab state
  const [activeTab, setActiveTab] = useState('recent')

  // Filter posts
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesMonth = selectedMonth === 'All' || post.month === selectedMonth
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag)

    return matchesCategory && matchesSearch && matchesMonth && matchesTag
  })

  // Get recent and popular posts for sidebar
  const recentPosts = [...BLOG_POSTS].sort((a, b) => b.id - a.id).slice(0, 5)
  const popularPosts = [...BLOG_POSTS].sort((a, b) => b.views - a.views).slice(0, 5)

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory('All')
    setSearchQuery('')
    setSelectedMonth('All')
    setSelectedTag('All')
  }

  return (
    <div className="min-h-screen bg-[#f4f4f6] text-zinc-900 pt-0 pb-0 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FA0C83]/[0.02] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] rounded-full bg-[#01CBDF]/[0.02] blur-[150px] pointer-events-none" />

      {/* 1. HERO SECTION (Our Blog Banner) */}
      <div className="relative w-full bg-[#101012] pt-32 pb-24 md:pt-44 md:pb-32 mb-16 text-center overflow-hidden">
        {/* Animated Background Image */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src={main6}
            alt="Blog Background"
            className="w-full h-full object-cover"
            animate={{
              scale: [1.02, 1.10, 1.02],
              x: [-3, 3, -3],
              y: [5, -5, 5]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-[#0b0b0c]/85 z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#0b0b0c_90%)] opacity-55 z-0" />
        </div>

        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-10" />

        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#FA0C83]/5 to-[#01CBDF]/5 blur-3xl pointer-events-none z-10" />

        {/* Floating Particles */}
        <HeroParticle x={12} y={30} size={4} color="#FA0C83" duration={9} delay={0} />
        <HeroParticle x={88} y={25} size={5} color="#01CBDF" duration={12} delay={1} />
        <HeroParticle x={30} y={75} size={3} color="#ffffff" duration={7} delay={3} />
        <HeroParticle x={68} y={80} size={6} color="#FA0C83" duration={14} delay={5} />
        <HeroParticle x={50} y={15} size={4} color="#01CBDF" duration={10} delay={6.5} />

        {/* Dynamic watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
          <h1 className="text-[12vw] font-black text-white/[0.015] tracking-tighter uppercase whitespace-nowrap leading-none font-display text-center">
            BLOG
          </h1>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-20 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase font-display"
            style={{ textShadow: '0 4px 16px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.4)' }}
          >
            Our Blog
          </motion.h1>

          {/* Breadcrumb path */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-[10px] md:text-xs font-black tracking-widest text-zinc-300 uppercase"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
          >
            <Link to="/" className="hover:text-[#FA0C83] transition-colors text-zinc-300">Home</Link>
            <span>/</span>
            <span className="text-white">Blog</span>
          </motion.div>
        </div>

        {/* Bottom Wavy Divider SVG */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] bg-transparent pointer-events-none z-30">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px] sm:h-[50px] md:h-[80px]">
            <path d="M0,80 C300,120 600,40 900,110 C1050,130 1150,90 1200,70 L1200,120 L0,120 Z" fill="#FA0C83" opacity="0.2" />
            <path d="M0,90 C250,110 550,60 850,115 C1000,130 1100,90 1200,75 L1200,120 L0,120 Z" fill="#01CBDF" opacity="0.15" />
            <path d="M0,100 C200,120 500,80 800,110 C950,120 1100,90 1200,80 L1200,120 L0,120 Z" fill="#f4f4f6" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Post Grid */}
          <div className="lg:col-span-8 space-y-12">

            {/* Active filters pill notice */}
            {(selectedCategory !== 'All' || searchQuery !== '' || selectedMonth !== 'All' || selectedTag !== 'All') && (
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white border border-zinc-200 shadow-sm">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-zinc-400 font-bold">Active filters:</span>
                  {selectedCategory !== 'All' && (
                    <span className="px-3 py-1 rounded-full bg-[#FA0C83]/10 border border-[#FA0C83]/30 text-[#FA0C83] font-black uppercase text-[10px] tracking-wider">
                      {selectedCategory}
                    </span>
                  )}
                  {selectedMonth !== 'All' && (
                    <span className="px-3 py-1 rounded-full bg-[#01CBDF]/10 border border-[#01CBDF]/30 text-[#01CBDF] font-black uppercase text-[10px] tracking-wider">
                      {selectedMonth}
                    </span>
                  )}
                  {selectedTag !== 'All' && (
                    <span className="px-3 py-1 rounded-full bg-zinc-200 border border-zinc-300 text-zinc-800 font-black uppercase text-[10px] tracking-wider">
                      #{selectedTag}
                    </span>
                  )}
                  {searchQuery !== '' && (
                    <span className="px-3 py-1 rounded-full bg-zinc-200 border border-zinc-300 text-zinc-800 font-black uppercase text-[10px] tracking-wider">
                      Search: "{searchQuery}"
                    </span>
                  )}
                </div>

                <button
                  onClick={resetFilters}
                  className="text-[10px] font-black uppercase tracking-wider text-[#FA0C83] hover:text-[#01CBDF] transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            )}

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post, index) => {
                  return (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      className="group cursor-pointer flex flex-col justify-between h-full bg-white border border-zinc-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#FA0C83] hover:shadow-lg hover:shadow-[#FA0C83]/5"
                      onClick={() => setActivePost(post)}
                    >
                      <div>
                        {/* Image Wrapper */}
                        <div className="aspect-[16/10] overflow-hidden relative">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Content block centered */}
                        <div className="p-6 text-center flex flex-col items-center">
                          {/* Category */}
                          <span className="text-[10px] font-black uppercase tracking-widest mb-2 transition-colors text-[#FA0C83] hover:text-[#01CBDF]">
                            {post.category}
                          </span>

                          {/* Title */}
                          <h3 className="text-lg md:text-xl font-black uppercase tracking-tight transition-colors duration-300 mb-3 leading-snug line-clamp-2 text-zinc-900 group-hover:text-[#FA0C83]">
                            {post.title}
                          </h3>

                          {/* Meta */}
                          <div className="flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest mb-4 text-zinc-400">
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5 text-[#01CBDF]" /> By {post.author.split(' ')[0].toLowerCase()}
                            </span>
                            <span>:</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-[#01CBDF]" /> {post.date}
                            </span>
                          </div>

                          {/* Excerpt */}
                          <p className="text-xs md:text-sm leading-relaxed mb-4 font-normal max-w-sm line-clamp-3 text-zinc-650">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      {/* Continue Reading Button */}
                      <div className="text-center pb-6">
                        <button className="text-xs font-black uppercase tracking-widest transition-colors duration-300 inline-block border-b-2 border-transparent cursor-pointer text-[#FA0C83] group-hover:text-zinc-900 hover:border-[#FA0C83]">
                          Continue Reading
                        </button>
                      </div>
                    </motion.article>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-24 border border-dashed border-zinc-200 rounded-3xl bg-white shadow-sm">
                <BookOpen className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-zinc-900 mb-2">No articles found</h3>
                <p className="text-zinc-500 text-xs mb-4">Try clearing your search query or selecting a different category.</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-full border border-zinc-700/80 text-xs font-black uppercase tracking-widest hover:text-white hover:border-[#FA0C83] transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <aside className="lg:col-span-4 space-y-10">

            {/* Widget 1: Search Widget */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-zinc-50 border border-zinc-200 focus:border-[#FA0C83] text-zinc-900 text-xs px-4 py-3.5 pr-12 rounded-lg outline-none transition-all duration-300 shadow-inner"
                />
                <button className="absolute right-0 h-full px-4 rounded-r-lg bg-[#FA0C83] text-white flex items-center justify-center hover:bg-[#FA0C83]/90 transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Widget 2: Tabs Widget (Recent / Popular / Comments) */}
            <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
              {/* Tab headers */}
              <div className="grid grid-cols-3 border-b border-zinc-200">
                {['recent', 'popular', 'comments'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3.5 text-[10px] font-black uppercase tracking-widest transition-all duration-300 border-t-2 relative cursor-pointer ${activeTab === tab
                      ? 'text-zinc-900 border-t-[#FA0C83] bg-zinc-50'
                      : 'text-zinc-500 border-t-transparent hover:text-zinc-900'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab contents */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'recent' && (
                    <motion.div
                      key="recent"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="space-y-4"
                    >
                      {recentPosts.map((post) => (
                        <div
                          key={post.id}
                          onClick={() => setActivePost(post)}
                          className="flex items-center gap-3 group cursor-pointer"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-zinc-200 bg-zinc-50">
                            <img src={post.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          <div className="space-y-1">
                            <h5 className="text-xs font-black uppercase tracking-tight text-zinc-800 group-hover:text-[#FA0C83] transition-colors line-clamp-1">
                              {post.title}
                            </h5>
                            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{post.date}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'popular' && (
                    <motion.div
                      key="popular"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="space-y-4"
                    >
                      {popularPosts.map((post) => (
                        <div
                          key={post.id}
                          onClick={() => setActivePost(post)}
                          className="flex items-center gap-3 group cursor-pointer"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-zinc-200 bg-zinc-50">
                            <img src={post.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          <div className="space-y-1">
                            <h5 className="text-xs font-black uppercase tracking-tight text-zinc-800 group-hover:text-[#FA0C83] transition-colors line-clamp-1">
                              {post.title}
                            </h5>
                            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{post.date} • {post.views} views</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'comments' && (
                    <motion.div
                      key="comments"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="space-y-4"
                    >
                      {MOCK_COMMENTS.map((comm) => (
                        <div key={comm.id} className="space-y-1.5 border-b border-zinc-200 pb-3 last:border-0 last:pb-0">
                          <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-[#01CBDF]">
                            <MessageSquare className="w-3 h-3 shrink-0" />
                            <span>{comm.author}</span>
                            <span className="text-zinc-400">on</span>
                            <span className="text-zinc-400 max-w-[120px] truncate">{comm.postTitle}</span>
                          </div>
                          <p className="text-[11px] text-zinc-650 leading-normal italic font-normal">
                            "{comm.content}"
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Widget 3: Archives Widget */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
              {/* Header with magenta line */}
              <div className="relative pb-3 mb-6 border-b border-zinc-200 flex justify-between items-center">
                <h4 className="text-xs font-black tracking-widest text-zinc-800 uppercase">Archives</h4>
                <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-[#FA0C83]" />
              </div>

              <ul className="space-y-2.5 text-xs font-bold uppercase tracking-wider text-zinc-600">
                {['May 2026', 'April 2026'].map((month) => (
                  <li key={month}>
                    <button
                      onClick={() => setSelectedMonth(selectedMonth === month ? 'All' : month)}
                      className={`flex items-center justify-between w-full hover:text-[#FA0C83] transition-colors cursor-pointer ${selectedMonth === month ? 'text-[#FA0C83]' : ''
                        }`}
                    >
                      <span>{month}</span>
                      <span className="text-[10px] text-zinc-400">({BLOG_POSTS.filter(p => p.month === month).length})</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Widget 4: Categories Widget */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
              {/* Header with magenta line */}
              <div className="relative pb-3 mb-6 border-b border-zinc-200">
                <h4 className="text-xs font-black tracking-widest text-zinc-800 uppercase">Categories</h4>
                <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-[#FA0C83]" />
              </div>

              <ul className="space-y-2.5 text-xs font-bold uppercase tracking-wider text-zinc-600">
                {CATEGORIES.slice(1).map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(selectedCategory === cat ? 'All' : cat)}
                      className={`flex items-center justify-between w-full hover:text-[#FA0C83] transition-colors cursor-pointer ${selectedCategory === cat ? 'text-[#FA0C83]' : ''
                        }`}
                    >
                      <span>{cat}</span>
                      <span className="text-[10px] text-zinc-400">({BLOG_POSTS.filter(p => p.category === cat).length})</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Widget 5: Tag Cloud Widget */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
              {/* Header with magenta line */}
              <div className="relative pb-3 mb-6 border-b border-zinc-200">
                <h4 className="text-xs font-black tracking-widest text-zinc-800 uppercase">Tag Cloud</h4>
                <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-[#FA0C83]" />
              </div>

              <div className="flex flex-wrap gap-2">
                {TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? 'All' : tag)}
                    className={`px-3 py-1.5 rounded text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${selectedTag === tag
                      ? 'bg-[#FA0C83] text-white border border-[#FA0C83]'
                      : 'bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-[#FA0C83] hover:border-[#FA0C83]'
                      }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

          </aside>

        </div>

      </div>

      {/* Article Detail Modal Overlay */}
      <AnimatePresence>
        {activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white border border-zinc-200 w-full max-w-3xl rounded-3xl overflow-hidden max-h-[85vh] flex flex-col shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white border border-zinc-200 hover:border-[#FA0C83] text-zinc-550 hover:text-zinc-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="overflow-y-auto p-6 md:p-8 space-y-6">
                <div className="aspect-[16/9] rounded-2xl overflow-hidden relative">
                  <img
                    src={activePost.image}
                    alt={activePost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  <span className="absolute bottom-4 left-4 bg-[#FA0C83] text-white text-[9px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full">
                    {activePost.category}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-zinc-400 text-xs font-bold uppercase tracking-widest">
                    <span>By {activePost.author}</span>
                    <span>•</span>
                    <span>{activePost.date}</span>
                    <span>•</span>
                    <span>{activePost.readTime}</span>
                  </div>

                  <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight text-zinc-900 leading-tight">
                    {activePost.title}
                  </h2>
                </div>

                <div className="text-zinc-650 text-sm md:text-base leading-relaxed space-y-4 font-normal">
                  <p className="font-medium text-zinc-800 border-l-2 border-[#01CBDF] pl-4 italic">
                    {activePost.excerpt}
                  </p>
                  <p>
                    {activePost.content || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam convallis libero ut sem pulvinar, non egestas dolor tristique. Cras ultrices lorem leo, id convallis sem porttitor sed. Ut molestie nisl vitae est semper dignissim. Pellentesque feugiat augue non purus condimentum sodales. Duis dictum elit nec ante lobortis efficitur.'}
                  </p>
                  <p>
                    Proin eleifend dictum sodales. Quisque gravida sodales accumsan. Curabitur vel tortor feugiat, laoreet sem ut, mollis nisl. Suspendisse eu scelerisque mauris. Quisque sollicitudin sem augue, sed tempor ex lacinia sed. Nunc egestas ipsum id diam interdum rhoncus.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WAVY DIVIDER: Page to Footer */}
      <div className="w-full overflow-hidden leading-[0] bg-[#f4f4f6] pointer-events-none relative z-10 -mb-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] sm:h-[60px] md:h-[80px]">
          <path d="M0,60 C350,20 650,110 950,50 C1080,20 1150,60 1200,75 L1200,120 L0,120 Z" fill="#FA0C83" opacity="0.12" />
          <path d="M0,75 C300,35 600,100 900,45 C1050,15 1120,55 1200,65 L1200,120 L0,120 Z" fill="#01CBDF" opacity="0.1" />
          <path d="M0,88 C250,55 550,95 850,55 C1000,35 1100,70 1200,62 L1200,120 L0,120 Z" fill="#111113" />
        </svg>
      </div>
    </div>
  )
}
