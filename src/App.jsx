import { useState, useEffect } from 'react'
import './App.css'

const unhelpfulSuggestions = [
  "A single, lukewarm pinto bean",
  "The concept of yellow", 
  "Three bites of a wax candle",
  "Half a pickle that's been staring at you",
  "The sound of crunching leaves, but edible",
  "Two tablespoons of regret",
  "A photograph of bread",
  "The memory of pizza from 2019",
  "One cheerio, but make it fancy",
  "The essence of a disappointed avocado",
  "Expired air from a bag of chips",
  "A single grain of rice that has trust issues",
  "The ghost of a banana",
  "Three drops of condensed confusion",
  "A wilted lettuce leaf's hopes and dreams",
  "The whisper of ancient cheese",
  "Half a cracker that's questioning its existence",
  "The tears of an onion, but happy tears",
  "A raisin that's having an identity crisis",
  "The shadow of a french fry",
  "One pea that's been overthinking life",
  "The concept of purple, but crunchy",
  "A strand of spaghetti that gave up",
  "The soul of a pretzel",
  "Two bites of existential dread",
  "A kernel of corn with commitment issues",
  "The echo of toast",
  "Half a grape that's lost its will to live",
  "The abstract idea of flavor",
  "A single noodle contemplating the universe",
  "Three molecules of disappointment",
  "The remains of yesterday's ambition",
  "A cookie crumb's life story",
  "The phantom limb of a hot dog",
  "Half a walnut having a midlife crisis",
  "The whispered dreams of celery",
  "A pinch of temporal displacement",
  "The loneliness of a cherry pit",
  "Two atoms of nostalgia",
  "A breadcrumb's memoir",
  "The gravitational pull of an olive",
  "Half a marshmallow in emotional distress",
  "The theoretical flavor of silence",
  "A single sunflower seed's autobiography",
  "The mathematical concept of soup",
  "Three quarters of a thought about pizza",
  "The emotional baggage of lettuce",
  "A popcorn kernel's unrealized potential",
  "The spiritual energy of stale crackers",
  "Half a blueberry's existential crisis",
  "The distant memory of chocolate",
  "A cashew contemplating its life choices",
  "The philosophical implications of toast",
  "Two decimal places of hunger",
  "The abstract concept of carbonation",
  "A single ice cube's melting anxiety",
  "The unresolved trauma of a burnt cookie",
  "Half a strawberry's seasonal depression",
  "The collective unconscious of cereal",
  "A grain of salt with boundary issues",
  "The metaphysical properties of steam",
  "Three microwaves worth of awkward silence",
  "The emotional support of a tea bag",
  "A single almond's impostor syndrome",
  "The quantum entanglement of leftovers",
  "Half a donut's hole complex",
  "The aerodynamics of spaghetti",
  "A coffee bean's caffeine addiction",
  "The socioeconomic status of a crouton",
  "Two tablespoons of cosmic uncertainty",
  "The political affiliation of a banana peel",
  "A single grain of quinoa's identity crisis",
  "The emotional intelligence of ketchup",
  "Half a fig's philosophical awakening",
  "The social anxiety of a dinner roll",
  "A droplet of maple syrup's sweet sorrow",
  "The cultural significance of a napkin",
  "Three bites of interdimensional space",
  "The therapeutic value of chewing air",
  "A single peppercorn's spicy attitude",
  "The unrequited love of salt and pepper",
  "Half a pancake's morning routine",
  "The existential weight of a feather-light wafer",
  "A tomato's gender identity crisis",
  "The feng shui of refrigerator contents",
  "Two spoonfuls of crystallized time",
  "The diplomatic relations between fork and spoon",
  "A single sesame seed's inferiority complex",
  "The aerobic capacity of a sandwich",
  "Half a muffin's abandonment issues",
  "The thermal dynamics of room temperature water",
  "A rogue piece of lettuce's rebellion",
  "The emotional labor of washing dishes",
  "Three cubic centimeters of pure confusion",
  "The social media presence of a carrot",
  "A single grain of sand, but make it edible",
  "The carbon footprint of a sigh",
  "Half a bagel's commitment phobia",
  "The psychological profile of expired milk"
]

function App() {
  const [currentSuggestion, setCurrentSuggestion] = useState("Click to discover your unhelpful meal destiny...")
  const [isRevealed, setIsRevealed] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [suggestionHistory, setSuggestionHistory] = useState([])
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [dailyCount, setDailyCount] = useState(0)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  // Load daily count from localStorage on component mount
  useEffect(() => {
    const today = new Date().toDateString()
    const savedData = localStorage.getItem('unhelpfulMealData')
    
    if (savedData) {
      const data = JSON.parse(savedData)
      if (data.date === today) {
        setDailyCount(data.count)
      } else {
        // New day, reset counter
        setDailyCount(0)
        localStorage.setItem('unhelpfulMealData', JSON.stringify({ date: today, count: 0 }))
      }
    } else {
      // First time using the app
      localStorage.setItem('unhelpfulMealData', JSON.stringify({ date: today, count: 0 }))
    }
  }, [])

  // PWA Installation Logic
  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    const isIOSStandalone = window.navigator.standalone === true
    setIsInstalled(isStandalone || isIOSStandalone)

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
      console.log('PWA install prompt available')
    }

    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      setDeferredPrompt(null)
      console.log('PWA was installed successfully')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  // Save daily count to localStorage whenever it changes
  useEffect(() => {
    const today = new Date().toDateString()
    localStorage.setItem('unhelpfulMealData', JSON.stringify({ date: today, count: dailyCount }))
  }, [dailyCount])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null)
    setIsInstallable(false)
  }

  const getRandomSuggestion = () => {
    // Prevent multiple clicks during animation
    if (isShaking || isRevealed) return
    
    // Start shake animation
    setIsShaking(true)
    
    // After shake completes, show the suggestion
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * unhelpfulSuggestions.length)
      const suggestion = unhelpfulSuggestions[randomIndex]
      setCurrentSuggestion(suggestion)
      setIsShaking(false)
      setIsRevealed(true)
      
      // Increment daily counter
      setDailyCount(prev => prev + 1)
      
      // Add to history with timestamp
      const historyEntry = {
        id: Date.now(),
        suggestion: suggestion,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setSuggestionHistory(prev => [historyEntry, ...prev].slice(0, 10)) // Keep only last 10
      
      // Reset after showing suggestion
      setTimeout(() => setIsRevealed(false), 3000)
    }, 800) // Shake duration
  }

  const clearHistory = () => {
    setSuggestionHistory([])
  }

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen)
  }

  const toggleShare = () => {
    setIsShareOpen(!isShareOpen)
  }

  const getCounterText = () => {
    if (dailyCount === 0) return ""
    if (dailyCount === 1) return "You've been unhelpfully fed 1 time today"
    return `You've been unhelpfully fed ${dailyCount} times today`
  }

  const getShareCaption = () => {
    const captions = [
      `I asked for meal advice and got: "${currentSuggestion}" 🤷‍♀️`,
      `The Unhelpful Meal Decider strikes again: "${currentSuggestion}" 😂`,
      `My dinner plans have been expertly ruined: "${currentSuggestion}" 🍽️`,
      `Thanks to science, I now know I should eat: "${currentSuggestion}" 🤦‍♀️`,
      `Breaking: Local person receives world's most unhelpful meal suggestion: "${currentSuggestion}" 📰`,
      `Update: Still hungry after being told to eat "${currentSuggestion}" 🤷‍♀️`,
      `Life hack: When hungry, just eat "${currentSuggestion}" (don't actually) 😅`
    ]
    return captions[Math.floor(Math.random() * captions.length)]
  }

  const shareToTwitter = () => {
    const caption = getShareCaption()
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}&url=${encodeURIComponent('https://apih99.github.io/unhelpfulMeal/')}&hashtags=UnhelpfulMeal,FoodDecisions,RandomMealGenerator`
    window.open(url, '_blank')
  }

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://apih99.github.io/unhelpfulMeal/')}&quote=${encodeURIComponent(getShareCaption())}`
    window.open(url, '_blank')
  }

  const shareToWhatsApp = () => {
    const caption = getShareCaption()
    const url = `https://wa.me/?text=${encodeURIComponent(caption + ' Try it yourself: https://apih99.github.io/unhelpfulMeal/')}`
    window.open(url, '_blank')
  }

  const shareToReddit = () => {
    const caption = getShareCaption()
    const url = `https://reddit.com/submit?title=${encodeURIComponent('The most unhelpful meal suggestion ever')}&text=${encodeURIComponent(caption + ' Try the Unhelpful Meal Decider: https://apih99.github.io/unhelpfulMeal/')}`
    window.open(url, '_blank')
  }

  const copyToClipboard = async () => {
    const caption = getShareCaption()
    const textToCopy = `${caption}\n\nTry the Unhelpful Meal Decider: https://apih99.github.io/unhelpfulMeal/`
    
    try {
      await navigator.clipboard.writeText(textToCopy)
      // Show a temporary success message
      const originalText = 'Copy Link'
      const button = document.querySelector('.copy-btn')
      if (button) {
        button.textContent = 'Copied! ✓'
        setTimeout(() => {
          button.textContent = originalText
        }, 2000)
      }
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">
          The Unhelpful<br />
          <span className="title-accent">Meal Decider</span>
        </h1>
        
        {/* PWA Install Button */}
        {isInstallable && !isInstalled && (
          <div className="install-section">
            <button 
              className="install-button"
              onClick={handleInstallClick}
            >
              📱 Install App
            </button>
            <p className="install-hint">Install for quick access and offline use!</p>
          </div>
        )}
        
        {/* Daily Counter */}
        {dailyCount > 0 && (
          <div className="daily-counter">
            {getCounterText()} 🍽️
          </div>
        )}
        
        <div className="suggestion-area">
          <div className={`suggestion ${isRevealed ? 'revealed' : ''}`}>
            {currentSuggestion}
          </div>
        </div>

        <button 
          className={`decision-button ${isShaking ? 'shaking' : ''}`}
          onClick={getRandomSuggestion}
        >
          What should I eat?
        </button>

        {/* Share Button */}
        {isRevealed && currentSuggestion !== "Click to discover your unhelpful meal destiny..." && (
          <div className="share-section">
            <button 
              className="share-button"
              onClick={toggleShare}
            >
              Share This Absurdity 📤
            </button>
            
            {isShareOpen && (
              <div className="share-dropdown">
                <div className="share-header">
                  <h4>Spread the Confusion</h4>
                  <p>Share your unhelpful meal destiny with the world!</p>
                </div>
                
                <div className="share-buttons">
                  <button className="share-btn twitter" onClick={shareToTwitter}>
                    🐦 Twitter
                  </button>
                  <button className="share-btn facebook" onClick={shareToFacebook}>
                    📘 Facebook
                  </button>
                  <button className="share-btn whatsapp" onClick={shareToWhatsApp}>
                    💬 WhatsApp
                  </button>
                  <button className="share-btn reddit" onClick={shareToReddit}>
                    🔴 Reddit
                  </button>
                  <button className="share-btn copy-btn" onClick={copyToClipboard}>
                    📋 Copy Link
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* History Section */}
        {suggestionHistory.length > 0 && (
          <div className="history-section">
            <button 
              className="history-toggle"
              onClick={toggleHistory}
            >
              {isHistoryOpen ? '▼' : '▶'} History ({suggestionHistory.length})
            </button>
            
            {isHistoryOpen && (
              <div className="history-panel">
                <div className="history-header">
                  <h3>Previous Absurd Suggestions</h3>
                  <button 
                    className="clear-history-btn"
                    onClick={clearHistory}
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="history-list">
                  {suggestionHistory.map((entry) => (
                    <div key={entry.id} className="history-item">
                      <div className="history-suggestion">{entry.suggestion}</div>
                      <div className="history-timestamp">{entry.timestamp}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="footer">
          <p>🤷‍♀️ Unhelpfully yours since never</p>
          {isInstalled && (
            <p className="pwa-badge">📱 App Mode Active</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
