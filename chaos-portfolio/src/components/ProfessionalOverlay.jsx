import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './ProfessionalOverlay.css';

// --- PROFESSIONAL OVERLAY COMPONENT ---
const ProfessionalOverlay = ({ isChaos }) => {
    const [activeTab, setActiveTab] = useState('homepage');
    const controls = useAnimation();

    // Animation Controls based on isChaos prop
    useEffect(() => {
        if (isChaos) {
            controls.start({ y: '-100vh' });
        } else {
            controls.start({ y: 0 });
        }
    }, [isChaos, controls]);

    // Scroll effect for Top Panel
    useEffect(() => {
        const handleScroll = () => {
            const topPanel = document.querySelector('.top-panel');
            const leftSection = document.querySelector('.left-section');
            const links = document.querySelectorAll('.right-section a');

            if (!topPanel) return;

            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

            if (scrollPercent > 10) {
                topPanel.style.backgroundColor = 'rgba(28, 28, 28, 0.9)';
                if (leftSection) leftSection.style.color = '#fbf7f5';
                links.forEach(l => l.style.color = '#fbf7f5');
            } else {
                topPanel.style.backgroundColor = '#fbf7f5';
                if (leftSection) leftSection.style.color = '#222222';
                links.forEach(l => l.style.color = '#1a1a1a');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div
            className="professional-wrapper"
            animate={controls}
            initial={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
        >
            {/* SCROLLABLE CONTENT CONTAINER */}
            <div className="professional-content">

                {/* NAVIGATION BAR */}
                <div className="top-panel" id="topPanel">
                    <div className="left-section" onClick={() => setActiveTab('homepage')}>
                        <img src="/logo.jpg" alt="Logo" style={{ borderRadius: '50%', maxWidth: '50px' }} />
                        <h1>P Venkatesh</h1>
                    </div>
                    <div className="right-section">
                        <ul>
                            <li>
                                <a href="#blog" className="blogs" onClick={(e) => { e.preventDefault(); setActiveTab('blog'); }}>Blogs &#9662;</a>
                                <ul>
                                    <li><a href="#blog1" onClick={(e) => { e.preventDefault(); setActiveTab('blog1'); }}>Google Gemini</a></li>
                                    <li><a href="#blog2" onClick={(e) => { e.preventDefault(); setActiveTab('blog2'); }}>Rise of esports in India</a></li>
                                </ul>
                            </li>
                            <li><a href="#about" onClick={(e) => { e.preventDefault(); setActiveTab('about'); }}>About</a></li>
                            <li><a href="#works" onClick={(e) => { e.preventDefault(); setActiveTab('works'); }}>Works</a></li>
                            <li><a href="#honors" onClick={(e) => { e.preventDefault(); setActiveTab('honors'); }}>Honors</a></li>
                        </ul>
                    </div>
                </div>

                {/* CONTENT PAGES */}

                {/* HOMEPAGE */}
                <div id="homepage" className={`main-page ${activeTab === 'homepage' ? 'active' : ''}`}>
                    <div className="container" style={{ position: 'relative', height: '80vh' }}>
                        <div style={{ position: 'absolute', left: '10%', top: '30%', color: '#FAED26', fontSize: '80px', lineHeight: '1.1' }}>
                            <div><b><i>Venkatesh</i></b></div>
                            <div><b><i>Patnaik</i></b></div>
                        </div>
                        <div style={{ position: 'absolute', left: '10%', top: '55%', color: '#f9f9f9e2', fontSize: '28px' }}>
                            <hr style={{ width: '100px', borderColor: '#FAED26', margin: '0 0 20px 0' }} />
                            <p>B.Tech. CSE (2025)</p>
                        </div>

                        <img src="/myPicture.jpg" alt="my picture" id="myPicture" style={{
                            position: 'absolute',
                            width: '300px',
                            height: '400px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                            right: '15%',
                            top: '20%'
                        }} />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '100px', color: '#666' }}>
                        <p style={{ fontSize: '25px' }}>🚧 The website is under construction, thank you for visiting :)</p>
                    </div>
                </div>

                {/* ABOUT */}
                <div id="about" className={`main-page ${activeTab === 'about' ? 'active' : ''}`}>
                    <div className="about-section" style={{ maxWidth: '800px', margin: '100px auto', color: '#fbf7f5' }}>
                        <h2 style={{ fontSize: '40px', marginBottom: '30px' }}>Hey there! 👋</h2>
                        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
                            I'm P Venkatesh, a B.Tech. Computer Science Engineering Graduate (2025) from VIT-AP University.
                            I hail from the vibrant city of Visakhapatnam in Andhra Pradesh, known for its rich maritime history.<br /><br />
                            I thrive on challenges and approach every project with dedication and enthusiasm.
                            Proficient in Python, Java, and fundamental front-end languages. This website you're on right now?
                            Ah ha, that's one of my creations. My projects span a range of technologies, including Raspberry Pi,
                            Arduino, and flight controllers.<br /><br />
                            Beyond academics, I have excelled in sports, e-sports, and Model United Nations.
                            I am fervent about astrophysics, and after years to come I wish to apply my knowledge in the field.<br /><br />
                            When not immersed in academic or athletic pursuits, you'll find me indulging in web series, anime,
                            and memes during my free hours. While some might call my sense of humor unique, I prefer to see it as an
                            acquired taste ( ͡° ͜ʖ ͡°).
                        </p>

                        <div className="about-content">
                            <div className="description section"><p>Your description goes here.</p></div>
                            <div className="education section"><p>Your education information goes here.</p></div>
                            <div className="skills section"><p>Your skills information goes here.</p></div>
                            <div className="hobbies section"><p>Your hobbies information goes here.</p></div>
                        </div>
                    </div>
                </div>

                {/* BLOG LIST */}
                <div id="blog" className={`main-page ${activeTab === 'blog' ? 'active' : ''}`}>
                    <div style={{ maxWidth: '800px', margin: '100px auto' }}>
                        <ol>
                            <li>
                                <a href="#blog1" onClick={(e) => { e.preventDefault(); setActiveTab('blog1'); }}>Google Gemini</a>
                                <div className="blog-image">
                                    <img src="/blog1/gemini.jpg" alt="Google Gemini" />
                                </div>
                            </li>
                            <li style={{ marginTop: '50px' }}>
                                <a href="#blog2" onClick={(e) => { e.preventDefault(); setActiveTab('blog2'); }}>Rise of esports in India</a>
                                <div className="blog-image">
                                    <img src="/blog2/esport.jpg" alt="Esports arena" />
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>

                {/* BLOG 1 */}
                <div id="blog1" className={`main-page ${activeTab === 'blog1' ? 'active' : ''}`} style={{ color: '#222' }}>
                    <div style={{ backgroundColor: '#ffffffe3', padding: '20px', borderRadius: '10px', maxWidth: '1000px', margin: '100px auto' }}>
                        <div style={{ textAlign: 'center', background: 'linear-gradient(90deg, #4285f4, #34a853, #fbbc05, #ea4335)', WebkitBackgroundClip: 'text', color: 'transparent', fontSize: '40px', fontWeight: 'bold', marginBottom: '20px' }}>
                            Google Gemini: Unveiling the Future of AI
                        </div>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ flex: '3' }}>
                                <div style={{ backgroundColor: '#fff', padding: '20px', marginBottom: '20px', borderRadius: '10px' }}>
                                    <h2>Introducing Google Gemini</h2>
                                    <hr />
                                    <h4>December 15, 2023</h4>
                                    <div style={{ height: '300px', overflow: 'hidden', textAlign: 'center', margin: '20px 0' }}>
                                        <img src="/blog1/gemini.jpg" alt="Gemini" style={{ height: '100%', width: 'auto' }} />
                                    </div>
                                    <p>Google has recently introduced its groundbreaking large language model (LLM), Google Gemini...</p>
                                </div>
                            </div>
                            <div style={{ flex: '1' }}>
                                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
                                    <h3>About Me</h3>
                                    <hr />
                                    <p>Hi, I'm Venkatesh...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BLOG 2 */}
                <div id="blog2" className={`main-page ${activeTab === 'blog2' ? 'active' : ''}`} style={{ color: '#fff' }}>
                    <div style={{ maxWidth: '800px', margin: '100px auto', fontFamily: 'Arial, sans-serif' }}>
                        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <h1>Rise of Esports in India</h1>
                            <hr />
                        </header>
                        <article>
                            <p>The rise of Esports in India has been nothing short of phenomenal...</p>
                            <img src="/blog2/esport.jpg" alt="Esports" style={{ width: '100%', borderRadius: '8px', margin: '20px 0' }} />
                            <p>Esports tournaments and events showcase the incredible skills...</p>
                        </article>
                    </div>
                </div>

                {/* WORKS */}
                <div id="works" className={`main-page ${activeTab === 'works' ? 'active' : ''}`}>
                    <div style={{ maxWidth: '800px', margin: '100px auto', textAlign: 'center' }}>
                        <h2>My Works</h2>
                        <p>Project showcase coming soon...</p>
                    </div>
                </div>

                {/* HONORS */}
                <div id="honors" className={`main-page ${activeTab === 'honors' ? 'active' : ''}`}>
                    <div style={{ maxWidth: '800px', margin: '100px auto', textAlign: 'center' }}>
                        <h2>Honors</h2>
                        <div style={{ marginTop: '50px' }}>
                            <img src="/logos/logo2.jpg" alt="Honors Image" style={{ maxWidth: '100%' }} />
                            <p>A sentence about your honors.</p>
                        </div>
                    </div>
                </div>

                {/* ANIMATED BACKGROUND SVGS */}
                <div className="svg-bg-container">
                    {[...Array(8)].map((_, i) => (
                        <svg key={i} className="svg" xmlns="http://www.w3.org/2000/svg">
                            <path d="m2.46,126.39c10.12,-0.06 20.25,-0.13 30.37,-0.19c0.06,-10.39 0.13,-20.79 0.19,-31.19c10.07,0 20.15,0 30.23,0c0,-10.46 0,-20.92 0,-31.39c10.33,0 20.67,0 31.00,0c0,-10.20 0,-20.41 0,-30.62c10.20,0 20.41,0 30.62,0c0,-10.20 0,-20.41 0,-30.62c15.18,0 30.36,0 45.55,0c0,5.10 0,10.20 0,15.31c-10.08,0 -20.16,0 -30.24,0c0,10.33 0,20.67 0,31.00c-10.20,0 -20.41,0 -30.62,0c0,10.33 0,20.67 0,31.00c-10.20,0 -20.41,0 -30.62,0c0,10.33 0,20.67 0,31.00c-10.33,0 -20.67,0 -31.00,0c0,10.46 0,20.92 0,31.39c-15.31,0 -30.62,0 -45.93,0c0.68,-5.07 -1.16,-10.79 0.43,-15.68l0,0z" strokeWidth="7" fill="none" />
                        </svg>
                    ))}
                </div>

            </div> {/* END OF SCROLLABLE CONTENT */}

        </motion.div>
    );
};

export default ProfessionalOverlay;
