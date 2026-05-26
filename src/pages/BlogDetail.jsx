import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { BLOG_POSTS } from '../data/blogData'

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

export default function BlogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const post = BLOG_POSTS.find(p => p.id === parseInt(id))
  
  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f4f4f6] flex flex-col items-center justify-center text-zinc-900 p-4">
        <h1 className="text-4xl font-black mb-4">Post Not Found</h1>
        <p className="text-zinc-500 mb-8">The blog article you are looking for does not exist.</p>
        {/* <button 
          onClick={() => navigate('/blog')}
          className="px-6 py-3 bg-[#FA0C83] text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#d80870] transition-colors shadow-lg shadow-[#FA0C83]/30 hover:shadow-[#FA0C83]/50"
        >
          Back to Blog
        </button> */}
      </div>
    )
  }

  // Get related posts (excluding current, ideally same category)
  const relatedPosts = BLOG_POSTS
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3)

  // Fallback to recent posts if no related category posts
  const displayRelated = relatedPosts.length > 0 
    ? relatedPosts 
    : BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-[#f4f4f6] text-zinc-900 font-sans selection:bg-[#FA0C83] selection:text-white pb-20 relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FA0C83]/[0.02] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] rounded-full bg-[#01CBDF]/[0.02] blur-[150px] pointer-events-none" />

      {/* 1. HERO SECTION */}
      <div className="relative w-full pt-32 pb-24 md:pt-44 md:pb-32 mb-16 bg-[#101012] overflow-hidden">
        {/* Animated Background Image */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src={post.image}
            alt={post.title}
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#101012] z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#101012_90%)] opacity-60 z-0" />
        </div>

        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-10" />

        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#FA0C83]/10 to-[#01CBDF]/10 blur-3xl pointer-events-none z-10" />

        {/* Floating Particles */}
        <HeroParticle x={12} y={30} size={4} color="#FA0C83" duration={9} delay={0} />
        <HeroParticle x={88} y={25} size={5} color="#01CBDF" duration={12} delay={1} />
        <HeroParticle x={30} y={75} size={3} color="#ffffff" duration={7} delay={3} />
        <HeroParticle x={68} y={80} size={6} color="#FA0C83" duration={14} delay={5} />
        <HeroParticle x={50} y={15} size={4} color="#01CBDF" duration={10} delay={6.5} />

        {/* Back Button */}
        {/* <div className="absolute top-24 md:top-32 left-4 md:left-8 z-20">
          <Link 
            to="/blog"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-all text-xs font-bold uppercase tracking-widest bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 hover:border-[#FA0C83] hover:shadow-[0_0_15px_rgba(250,12,131,0.3)]"
          >
            <Icon icon="lucide:arrow-left" className="w-4 h-4" /> Back to Blog
          </Link>
        </div> */}

        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 mt-8">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-[#FA0C83] text-white text-[10px] md:text-xs font-black uppercase tracking-widest rounded-full shadow-lg shadow-[#FA0C83]/30"
          >
            {post.category}
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.1] font-display"
            style={{ textShadow: '0 4px 16px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.4)' }}
          >
            {post.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm font-bold uppercase tracking-widest text-zinc-300"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
          >
            <div className="flex items-center gap-2">
              <Icon icon="lucide:user" className="w-4 h-4 text-[#01CBDF]" />
              <span className="text-white">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:calendar" className="w-4 h-4 text-[#01CBDF]" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:clock" className="w-4 h-4 text-[#01CBDF]" />
              <span>{post.readTime}</span>
            </div>
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

      {/* 2. MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-5 pb-4 relative z-20">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl shadow-xl shadow-zinc-200/50 border border-zinc-100 p-6 md:p-12"
        >
          {/* Social Share (Top) */}
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-zinc-100">
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <Icon icon="lucide:share-2" className="w-4 h-4" /> Share
            </span>
            <button className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center hover:bg-[#FA0C83] hover:border-[#FA0C83] hover:text-white transition-colors text-zinc-600 text-[10px] font-black uppercase shadow-sm">
              FB
            </button>
            <button className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center hover:bg-[#01CBDF] hover:border-[#01CBDF] hover:text-white transition-colors text-zinc-600 text-[10px] font-black uppercase shadow-sm">
              X
            </button>
            <button className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-colors text-zinc-600 text-[10px] font-black uppercase shadow-sm">
              IN
            </button>
          </div>

          {/* Article Body */}
          <article className="prose prose-lg md:prose-xl max-w-none 
            prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-zinc-900
            prose-h2:text-[#FA0C83] prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-zinc-800
            prose-p:text-zinc-600 prose-p:leading-relaxed
            prose-a:text-[#01CBDF] hover:prose-a:text-[#FA0C83] prose-a:transition-colors
            prose-strong:text-zinc-900 prose-strong:font-bold
            prose-blockquote:border-l-[#01CBDF] prose-blockquote:bg-zinc-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-zinc-700 prose-blockquote:shadow-sm
          ">
            <p className="text-xl md:text-2xl text-zinc-800 font-medium leading-relaxed mb-10 border-l-4 border-[#FA0C83] pl-6 py-2 bg-gradient-to-r from-[#FA0C83]/5 to-transparent">
              {post.excerpt}
            </p>

            <p>{post.content}</p>
            
            <h2>Understanding the Cultural Impact</h2>
            <p>
              The landscape of magic mushrooms is rapidly evolving. From underground holistic practices to mainstream clinical trials, the acceptance of psilocybin is growing exponentially. Organizations across Canada and the United States are advocating for safe, regulated access to these incredible fungi.
            </p>
            
            <blockquote>
              "Psychedelics, used responsibly and with proper intention, are not a way to escape reality, but a way to fully immerse oneself in the true nature of existence." — Modern Shroom Advocate
            </blockquote>

            <h3>Choosing the Right Protocol</h3>
            <p>
              Whether you follow the Fadiman protocol (1 day on, 2 days off) or the Stamets stack (combining psilocybin with Lion's Mane and Niacin), consistency and intention are key. Always start low and go slow, especially if you are new to the experience.
            </p>
          </article>

          {/* Tags */}
          <div className="mt-16 pt-8 border-t border-zinc-100 flex flex-wrap items-center gap-3">
            <Icon icon="lucide:tag" className="w-5 h-5 text-[#FA0C83]" />
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mr-2">Tags:</span>
            {post.tags.map(tag => (
              <Link 
                key={tag} 
                to="/blog"
                className="px-4 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-[10px] font-black text-zinc-600 hover:text-white hover:border-[#FA0C83] hover:bg-[#FA0C83] transition-all uppercase tracking-widest shadow-sm"
              >
                {tag}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* COMMENTS SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-7xl mx-auto mt-5"
        >
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-zinc-200/50">
            <h4 className="text-lg md:text-xl font-black text-zinc-900 mb-1.5 uppercase tracking-tight">Leave a Comment</h4>
            <p className="text-xs text-zinc-500 mb-6 font-medium">Your email address will not be published. Required fields are marked *</p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-zinc-800 uppercase tracking-widest mb-1.5">Comment *</label>
                <textarea 
                  rows="4" 
                  className="w-full bg-white border border-zinc-200 rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#FA0C83] transition-colors resize-none shadow-sm"
                  required
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-800 uppercase tracking-widest mb-1.5">Name *</label>
                  <input 
                    type="text" 
                    className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#FA0C83] transition-colors shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-zinc-800 uppercase tracking-widest mb-1.5">Email *</label>
                  <input 
                    type="email" 
                    className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#FA0C83] transition-colors shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="pt-3">
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-[#FA0C83] text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#d80870] transition-colors shadow-md w-full md:w-auto"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* 3. RELATED POSTS */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-14 relative z-20">
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-zinc-200">
          <h3 className="text-2xl md:text-3xl font-black text-zinc-900 uppercase tracking-tight">Related Articles</h3>
          <Link to="/blog" className="hidden md:flex items-center gap-2 text-[#FA0C83] hover:text-[#01CBDF] text-xs font-black uppercase tracking-widest transition-colors">
            View All News <Icon icon="lucide:arrow-right" className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {displayRelated.map((related, index) => (
            <Link 
              key={related.id} 
              to={`/blog/${related.id}`}
            >
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer flex flex-col justify-between h-full bg-white border border-zinc-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#FA0C83] hover:shadow-lg hover:shadow-[#FA0C83]/5"
              >
                <div>
                  {/* Image Wrapper */}
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Content block centered */}
                  <div className="p-6 text-center flex flex-col items-center">
                    {/* Category */}
                    <span className="text-[10px] font-black uppercase tracking-widest mb-2 transition-colors text-[#FA0C83] hover:text-[#01CBDF]">
                      {related.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-black uppercase tracking-tight transition-colors duration-300 mb-3 leading-snug line-clamp-2 text-zinc-900 group-hover:text-[#FA0C83]">
                      {related.title}
                    </h3>

                    {/* Meta */}
                    <div className="flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest mb-4 text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Icon icon="lucide:user" className="w-3.5 h-3.5 text-[#01CBDF]" /> By {related.author ? related.author.split(' ')[0].toLowerCase() : 'admin'}
                      </span>
                      <span>:</span>
                      <span className="flex items-center gap-1">
                        <Icon icon="lucide:calendar" className="w-3.5 h-3.5 text-[#01CBDF]" /> {related.date}
                      </span>
                    </div>

                    {/* Excerpt */}
                    <p className="text-xs md:text-sm leading-relaxed mb-4 font-normal max-w-sm line-clamp-3 text-zinc-500">
                      {related.excerpt}
                    </p>
                  </div>
                </div>

                {/* Continue Reading Button */}
                <div className="text-center pb-6">
                  <span className="text-xs font-black uppercase tracking-widest transition-colors duration-300 inline-block border-b-2 border-transparent cursor-pointer text-[#FA0C83] group-hover:text-zinc-900 hover:border-[#FA0C83]">
                    Continue Reading
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center md:hidden">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#FA0C83] hover:text-white hover:bg-[#FA0C83] text-xs font-black uppercase tracking-widest transition-colors border-2 border-[#FA0C83] px-6 py-3 rounded-full">
            View All News <Icon icon="lucide:arrow-right" className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  )
}
