import ActivityFeed from '../components/ActivityFeed'
import BotSection from '../components/BotSection'
import Navbar from '../components/Navbar'
import ScreenshotPanel from '../components/ScreenshotPanel'
import StatCard from '../components/StatCard'

const stats = [
  { label: 'Active Bots', value: '4', accent: 'mint' },
  { label: 'Bots With Errors', value: '1', accent: 'rose' },
  { label: 'Items Found Today', value: '69', accent: 'neutral' },
  { label: 'Listed Today', value: '12', accent: 'neutral' },
]

const activityItems = [
  {
    id: 'activity-1',
    bot: 'TS Scout',
    message: 'Found 3 items at Walmart McAllen',
    time: '36s',
    icon: 'travel_explore',
    tone: 'peach',
  },
  {
    id: 'activity-2',
    bot: 'AMZ Lister',
    message: 'Listed 2 items on Amazon',
    time: '1m',
    icon: 'inventory_2',
    tone: 'gold',
  },
  {
    id: 'activity-3',
    bot: 'Scraper 1',
    message: 'Scraped data for AirPods Pro',
    time: '1m',
    icon: 'content_cut',
    tone: 'lilac',
  },
  {
    id: 'activity-4',
    bot: 'TS Scout',
    message: 'Error - Invalid UPC code',
    time: '2m',
    icon: 'travel_explore',
    tone: 'peach',
    variant: 'error',
  },
]

const screenshotItems = [
  { id: 'shot-1', bot: 'TS Scout', count: 2, icon: 'travel_explore', tone: 'peach' },
  { id: 'shot-2', bot: 'AMZ Lister', count: 1, icon: 'inventory_2', tone: 'gold' },
  { id: 'shot-3', bot: 'Scraper 1', count: 3, icon: 'content_cut', tone: 'lilac' },
]

const scouterRows = [
  {
    id: 'scout-1',
    name: 'TS Scout',
    website: 'TurboSearch',
    status: 'Working',
    runtime: '01:24:06',
    icon: 'travel_explore',
    tone: 'peach',
  },
  {
    id: 'scout-2',
    name: 'TS Scout',
    website: 'TurboSearch',
    status: 'Paused',
    runtime: '01:24:06',
    icon: 'travel_explore',
    tone: 'peach',
  },
  {
    id: 'scout-3',
    name: 'TS Scout',
    website: 'TurboSearch',
    status: 'Error',
    runtime: '01:24:06',
    icon: 'travel_explore',
    tone: 'peach',
  },
]

const listerRows = [
  {
    id: 'lister-1',
    name: 'AMZ Lister',
    website: 'Amazon',
    status: 'Working',
    runtime: '01:24:06',
    icon: 'inventory_2',
    tone: 'gold',
  },
  {
    id: 'lister-2',
    name: 'WAL Lister',
    website: 'Walmart',
    status: 'Paused',
    runtime: '01:24:06',
    icon: 'inventory_2',
    tone: 'gold',
  },
]

const scraperRows = [
  {
    id: 'scraper-1',
    name: 'Scraper 1',
    website: 'TurboSearch',
    status: 'Working',
    runtime: '01:24:06',
    icon: 'content_cut',
    tone: 'lilac',
  },
  {
    id: 'scraper-2',
    name: 'Scraper 2',
    website: 'TurboSearch',
    status: 'Working',
    runtime: '01:24:06',
    icon: 'content_cut',
    tone: 'lilac',
  },
]

function Home() {
  return (
    <div className="app">
      <Navbar />
      <main className="dashboard">
        <section className="stats-grid">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </section>

        <section className="activity-grid">
          <ActivityFeed items={activityItems} />
          <ScreenshotPanel items={screenshotItems} />
        </section>

        <section className="bot-area">
          <h1 className="page-title">Active Bots</h1>
          <BotSection
            title="Scouters"
            accent="peach"
            rows={scouterRows}
            newLabel="New Scouter"
          />
          <BotSection
            title="Listers"
            accent="gold"
            rows={listerRows}
            newLabel="New Lister"
          />
          <BotSection
            title="Scrapers"
            accent="lilac"
            rows={scraperRows}
            newLabel="New Scraper"
          />
        </section>
      </main>
    </div>
  )
}

export default Home
