import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'science-of-stage-fright',
    title: 'The Science of Stage Fright: Why High Achievers Freeze',
    excerpt: 'Understanding the biological fight-or-flight response is the first step to conquering public speaking anxiety.',
    author: 'Meera V.',
    date: 'Oct 12, 2024',
    readTime: '5 min read',
    // Fixed Image URL
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2670&auto=format&fit=crop',
    category: 'Psychology',
    tags: ['Anxiety', 'Public Speaking', 'Mindset'],
    content: `
      <p>It happens to the best of us. You're confident, prepared, and ready. But the moment you step onto the stage, your palms sweat, your heart races, and your mind goes blank. This isn't a sign of incompetence; it's biology.</p>
      
      <h3>The Amygdala Hijack</h3>
      <p>When you face an audience, your brain's amygdala perceives the sea of eyes as a threat, similar to a predator in the wild. It triggers the "fight-or-flight" response, flooding your system with cortisol and adrenaline.</p>
      
      <blockquote>"Courage is not the absence of fear, but the triumph over it." - Nelson Mandela</blockquote>
      
      <h3>Rewiring the Response</h3>
      <p>At Rapids LXP, we don't teach you to eliminate fear—we teach you to harness it. That energy can be converted into passion and presence. Through exposure therapy and controlled simulations, we help executives reframe the stage from a threat to an opportunity.</p>
      
      <h3>3 Quick Hacks for Immediate Calm</h3>
      <ul>
        <li><strong>Box Breathing:</strong> Inhale for 4s, hold for 4s, exhale for 4s. This resets your nervous system.</li>
        <li><strong>Power Posing:</strong> Standing in an expansive posture for 2 minutes increases testosterone and lowers cortisol.</li>
        <li><strong>The "Audience is a Friend" Visualization:</strong> Shift your internal narrative from "they are judging me" to "I have something valuable to give them."</li>
      </ul>
    `
  },
  {
    id: 'non-verbal-cues-boardroom',
    title: 'Non-Verbal Cues That Scream Confidence in Boardrooms',
    excerpt: 'Your words account for only 7% of communication. Here is how to master the other 93%.',
    author: 'Anil VG',
    date: 'Oct 15, 2024',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2670&auto=format&fit=crop',
    category: 'Leadership',
    tags: ['Body Language', 'Corporate', 'Influence'],
    content: `
      <p>In high-stakes negotiations and board meetings, what you <em>don't</em> say speaks louder than what you do. Executive presence is largely defined by your non-verbal communication.</p>
      
      <h3>The Triangle of Trust</h3>
      <p>When listening, focus your gaze in the triangle between the speaker's eyes and forehead. This projects authority. Looking lower (mouth/chin) signals intimacy or submission, which is inappropriate for the boardroom.</p>
      
      <h3>Controlled Gestures</h3>
      <p>Amateur speakers flail. Leaders use controlled, open-palm gestures. 
      <br/><br/>
      <strong>The Steeple:</strong> Touching fingertips together forms a steeple, a universal sign of confidence and deep thought used by leaders like Angela Merkel and Barack Obama.</p>
      
      <h3>The Power of Stillness</h3>
      <p>Nervous energy manifests as fidgeting—tapping pens, shaking legs, or shifting weight. Practice absolute stillness when you are making a crucial point. It forces the room to focus entirely on your words.</p>
    `
  },
  {
    id: 'impromptu-speaking-frameworks',
    title: 'How to Answer Impromptu Questions Like a CEO',
    excerpt: 'Never get caught off guard again. Use the PREP framework to structure your thoughts instantly.',
    author: 'Anil VG',
    date: 'Oct 18, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2670&auto=format&fit=crop',
    category: 'Skills',
    tags: ['Impromptu', 'Frameworks', 'Interviews'],
    content: `
      <p>The terrifying moment: "So, what's your take on this?" in a meeting where you haven't prepared. Most people ramble. You won't.</p>
      
      <h3>The PREP Framework</h3>
      <p>Memorize this structure to sound coherent instantly:</p>
      <ul>
        <li><strong>P - Point:</strong> State your main answer in one sentence.</li>
        <li><strong>R - Reason:</strong> Explain why you believe this.</li>
        <li><strong>E - Example:</strong> Give a specific data point or story.</li>
        <li><strong>P - Point:</strong> Reiterate your main point to close.</li>
      </ul>
      
      <h3>Example in Action</h3>
      <p><strong>Q:</strong> "Should we expand to the Dubai market?"</p>
      <p><strong>A (Using PREP):</strong> "Yes, I believe Dubai is our next logical step (Point). The market saturation there is low for our specific niche (Reason). For instance, Competitor X tried but failed due to lack of local support, which we have (Example). Therefore, we should move forward with the expansion (Point)."</p>
    `
  },
  {
    id: 'storytelling-for-data',
    title: 'Storytelling for Data: Turning Spreadsheets into Narratives',
    excerpt: 'Data dumps put audiences to sleep. Learn to wrap your analytics in a compelling story arc.',
    author: 'Dr. Sarah Jenkins',
    date: 'Oct 20, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    category: 'Presentation',
    tags: ['Data', 'Storytelling', 'Analytics'],
    content: `
      <p>Numbers don't stick. Stories do. If you want your Q3 report to be remembered, stop reading rows from Excel.</p>
      
      <h3>The Narrative Arc</h3>
      <p>Every data presentation should have a hero (the customer or the product) and a villain (the problem/inefficiency).</p>
      
      <h3>Context is King</h3>
      <p>Don't just say "Revenue is up 20%." Say, "Despite the market downturn (Villain), our new retention strategy (The Weapon) allowed us to grow revenue by 20% (The Victory)."</p>
      
      <h3>Visualizing the Insight</h3>
      <p>Use charts sparingly. One insight per slide. If you have a table with 50 rows, highlight the one row that matters and grey out the rest. Direct the eye, don't overwhelm it.</p>
    `
  },
  {
    id: 'voice-modulation-tools',
    title: 'Voice Modulation: The Hidden Tool of Persuasion',
    excerpt: 'Monotone is the enemy of engagement. Learn to use pitch, pace, and pause.',
    author: 'Meera V.',
    date: 'Oct 22, 2024',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2670&auto=format&fit=crop',
    category: 'Skills',
    tags: ['Voice', 'Public Speaking', 'Persuasion'],
    content: `
      <p>Your voice is an instrument. Most executives play only one note. To persuade, you must master the three Ps: Pitch, Pace, and Pause.</p>
      
      <h3>The Power Pause</h3>
      <p>Before delivering a key point, stop. Wait for 2 seconds. The silence creates anticipation. After delivering the point, pause again. This lets the message sink in.</p>
      
      <h3>Varying the Pace</h3>
      <p>Speed up to show excitement or urgency. Slow down to emphasize importance or gravity. A constant speed induces a trance-like state in the audience (sleep).</p>
      
      <h3>Lowering the Pitch</h3>
      <p>Research shows that lower-pitched voices are perceived as more authoritative. Practice speaking from your diaphragm, not your throat, to access your natural lower register.</p>
    `
  },
  {
    id: 'handling-hostile-qa',
    title: 'Handling Hostile Q&A Sessions with Grace',
    excerpt: 'How to maintain composure when the questions turn aggressive or skeptical.',
    author: 'Anil VG',
    date: 'Oct 25, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2670&auto=format&fit=crop',
    category: 'Crisis Mgmt',
    tags: ['Q&A', 'Conflict', 'Leadership'],
    content: `
      <p>The presentation went well, but now the floor is open, and someone is attacking your data. How you react here defines your leadership.</p>
      
      <h3>Don't Get Defensive</h3>
      <p>The moment you defend, you lose. Instead, acknowledge and pivot. "That's a valid concern regarding the timeline..."</p>
      
      <h3>The Bridging Technique</h3>
      <p>Acknowledge the question, then bridge to your key message. 
      <br/><em>"I understand your worry about cost (Acknowledge). However, the key value driver here is long-term efficiency (Bridge), which will save us 2x in the long run (Message)."</em></p>
      
      <h3>Check for Understanding</h3>
      <p>After answering, ask "Does that address your concern?" It puts the ball back in their court and shows you care about clarity, not just winning the argument.</p>
    `
  },
  {
    id: 'networking-for-introverts',
    title: 'Networking for Introverts: A Communication Playbook',
    excerpt: 'You do not need to be the loudest person in the room to build a powerful network.',
    author: 'Meera V.',
    date: 'Oct 28, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2670&auto=format&fit=crop',
    category: 'Social',
    tags: ['Networking', 'Introverts', 'Career'],
    content: `
      <p>Networking events can be draining for introverts. But introverts often make better networkers because they are better listeners.</p>
      
      <h3>Quality over Quantity</h3>
      <p>Don't aim to meet 50 people. Aim for 3 meaningful conversations. Deep connections yield more value than a stack of business cards.</p>
      
      <h3>Prepared Opening Lines</h3>
      <p>Skip the "What do you do?" Try: "What brings you to this event?" or "What's the most interesting thing you've heard today?" These open-ended questions invite stories, not resumes.</p>
      
      <h3>The Follow-Up</h3>
      <p>The real work happens after the event. Send a personalized LinkedIn note mentioning a specific detail from your conversation. This cements the bond.</p>
    `
  },
  {
    id: 'killer-credibility-ums-ahs',
    title: 'Why "Ums" and "Ahs" Are Killing Your Credibility',
    excerpt: 'Filler words signal uncertainty. Here are the drills to eliminate them for good.',
    author: 'Dr. Sarah Jenkins',
    date: 'Oct 30, 2024',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2670&auto=format&fit=crop',
    category: 'Skills',
    tags: ['Fluency', 'Credibility', 'Habits'],
    content: `
      <p>Filler words like "um," "ah," "like," and "you know" are verbal crutches. We use them because we are afraid of silence.</p>
      
      <h3>The Cost of Fillers</h3>
      <p>Excessive fillers make you sound unprepared and lacking in confidence. They dilute your message.</p>
      
      <h3>The Cure: Embrace the Pause</h3>
      <p>When you feel an "um" coming, simply close your mouth. Pause. Think. Then speak. A silent pause makes you look thoughtful; an "um" makes you look lost.</p>
      
      <h3>The Rubber Band Method</h3>
      <p>Wear a rubber band on your wrist. Snap it gently every time you catch yourself using a filler word. The physical feedback helps break the subconscious habit loop.</p>
    `
  },
  {
    id: '3-second-rule',
    title: 'The 3-Second Rule: Commanding Attention Before You Speak',
    excerpt: 'The audience judges you before you utter a word. Win them over in the first 3 seconds.',
    author: 'Anil VG',
    date: 'Nov 02, 2024',
    readTime: '3 min read',
    // Fixed Image URL
    image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=2670&auto=format&fit=crop',
    category: 'Presence',
    tags: ['First Impressions', 'Stage Presence'],
    content: `
      <p>Most speakers rush to the mic and start talking immediately. This signals nervousness.</p>
      
      <h3>Walk, Plant, Scan</h3>
      <p>Walk to the center of the stage. Plant your feet shoulder-width apart. Scan the audience from left to right. Smile. Only then, begin.</p>
      
      <h3>Dress the Part</h3>
      <p>Your attire communicates respect for the audience and authority. Dress one level above the audience average.</p>
      
      <h3>The Eye Contact Anchor</h3>
      <p>Find one friendly face in the audience and lock eyes for a second before you start. It grounds you and establishes a human connection immediately.</p>
    `
  },
  {
    id: 'psychology-of-influence',
    title: 'The Psychology of Influence: Beyond Words',
    excerpt: ' leveraging Cialdini’s principles to move people to action in a corporate setting.',
    author: 'Meera V.',
    date: 'Nov 05, 2024',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop',
    category: 'Psychology',
    tags: ['Influence', 'Sales', 'Leadership'],
    content: `
      <p>Influence is not manipulation; it's understanding human needs. As a leader, you need to move people to action.</p>
      
      <h3>Reciprocity</h3>
      <p>Give before you ask. Offer value, mentorship, or support. People are hardwired to return favors.</p>
      
      <h3>Social Proof</h3>
      <p>When proposing a new idea, mention who else is already on board. "The marketing team is excited about this..." validates the safety of the decision.</p>
      
      <h3>Authority</h3>
      <p>Establish expertise early. Don't brag, but casually mention relevant experience. "In my 10 years dealing with supply chains..." signals that you know what you're talking about.</p>
    `
  }
];

export const getBlogPost = (id: string) => BLOG_POSTS.find(post => post.id === id);