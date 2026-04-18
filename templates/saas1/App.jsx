import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  ChevronRight,
  ChevronDown,
  Globe,
  Layers,
  LineChart,
  Lock,
  Menu,
  MessageSquare,
  Sparkles,
  Star,
  Users,
  X,
  Zap,
  MapPin,
  Phone,
  Mail,
  Building2,
  Clock,
  Shield,
  PlayCircle,
  Headphones,
  Twitter,
  Github,
  Linkedin,
  Youtube,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'

const nav = ['Platform', 'Solutions', 'Customers', 'Pricing', 'Resources']

/* ------------------------------------------------------------------ */
/*  Office locations (used in header dropdown + map + contact)         */
/* ------------------------------------------------------------------ */
const offices = [
  { city: 'San Francisco', country: 'USA',       hq: true,  x: 14, y: 40, phone: '+1 (415) 555-0140', email: 'hq@nexusai.com' },
  { city: 'New York',      country: 'USA',       hq: false, x: 26, y: 39, phone: '+1 (212) 555-0199', email: 'ny@nexusai.com' },
  { city: 'London',        country: 'UK',        hq: false, x: 46, y: 34, phone: '+44 20 7946 0199', email: 'london@nexusai.com' },
  { city: 'Berlin',        country: 'Germany',   hq: false, x: 50, y: 33, phone: '+49 30 5683 0199', email: 'eu@nexusai.com' },
  { city: 'Dubai',         country: 'UAE',       hq: false, x: 58, y: 46, phone: '+971 4 518 0199',  email: 'mea@nexusai.com' },
  { city: 'Bengaluru',     country: 'India',     hq: false, x: 66, y: 52, phone: '+91 80 4567 0199', email: 'india@nexusai.com' },
  { city: 'Singapore',     country: 'Singapore', hq: false, x: 74, y: 58, phone: '+65 6797 0199',    email: 'apac@nexusai.com' },
  { city: 'Tokyo',         country: 'Japan',     hq: false, x: 82, y: 42, phone: '+81 3 6636 0199',  email: 'jp@nexusai.com' },
  { city: 'Sydney',        country: 'Australia', hq: false, x: 85, y: 72, phone: '+61 2 8188 0199',  email: 'au@nexusai.com' },
]

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Insights',
    desc: 'Automatically surface trends, anomalies, and opportunities from your data with state-of-the-art machine learning models.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Dashboards',
    desc: 'Build interactive dashboards that update in milliseconds. Drag, drop, and customize every visualization.',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    desc: 'SOC 2 Type II certified with end-to-end encryption, SSO, RBAC, and audit logging built in from day one.',
  },
  {
    icon: Globe,
    title: 'Global Data Mesh',
    desc: 'Connect to 200+ data sources worldwide. Unify your warehouse, lake, and streaming data in one platform.',
  },
  {
    icon: Bot,
    title: 'Natural Language Queries',
    desc: 'Ask questions in plain English and get instant charts, tables, and answers. No SQL required.',
  },
  {
    icon: Layers,
    title: 'Version-Controlled Pipelines',
    desc: 'Git-native data pipelines with branching, rollback, and CI/CD integration for every transformation.',
  },
]

const stats = [
  { value: '10M+', label: 'Queries Processed Daily' },
  { value: '99.99%', label: 'Platform Uptime' },
  { value: '4,200+', label: 'Companies Worldwide' },
  { value: '<50ms', label: 'Avg. Query Latency' },
]

const pricing = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    desc: 'For individuals and small teams exploring analytics.',
    features: ['5 dashboards', '10K rows per dataset', '3 data connectors', 'Community support', '7-day data retention'],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    desc: 'For growing teams that need real-time insights at scale.',
    features: ['Unlimited dashboards', '10M rows per dataset', '50+ data connectors', 'AI-powered insights', 'Priority support', '1-year data retention', 'Custom branding'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For organizations with advanced security and compliance needs.',
    features: ['Everything in Pro', 'Unlimited data', '200+ connectors', 'SSO & SAML', 'Dedicated CSM', 'SLA guarantee', 'On-prem deployment', 'Custom integrations'],
    cta: 'Contact Sales',
    popular: false,
  },
]

const testimonials = [
  {
    quote: 'Nexus AI replaced three separate tools for us. The natural language query feature alone saves our analysts 10 hours a week.',
    name: 'Sarah Chen',
    role: 'VP of Data, Streamline Commerce',
    avatar: 'SC',
  },
  {
    quote: 'We went from spending days building dashboards to minutes. The AI suggestions are eerily accurate and always relevant.',
    name: 'Marcus Rivera',
    role: 'Head of Analytics, Cloudpeak Systems',
    avatar: 'MR',
  },
  {
    quote: 'The enterprise security features gave our CISO confidence from day one. Deployment took less than a week for 500 users.',
    name: 'Emily Nakamura',
    role: 'CTO, Helix Biotech',
    avatar: 'EN',
  },
]

const footerLinks = {
  Product: ['Features', 'Integrations', 'Pricing', 'Changelog', 'Documentation'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Partners'],
  Resources: ['Community', 'Help Center', 'Status', 'API Reference', 'Templates'],
  Legal: ['Privacy', 'Terms', 'Security', 'GDPR', 'Cookies'],
}

const trustedBy = ['Acme Corp', 'Globex', 'Initech', 'Umbrella', 'Massive Dynamic', 'Soylent']

export default function SaasTemplate({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [officesOpen, setOfficesOpen] = useState(false)
  const [activeOffice, setActiveOffice] = useState(offices[0])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* ───────── Top Utility Strip ───────── */}
      <div className="relative hidden border-b border-slate-200/60 bg-slate-50 text-xs text-slate-600 dark:border-slate-800/60 dark:bg-slate-950 dark:text-slate-400 lg:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              All systems operational
            </span>
            <span className="hidden xl:inline">·</span>
            <span className="hidden xl:inline">ISO 27001 &middot; SOC 2 Type II &middot; HIPAA &middot; GDPR</span>
          </div>
          <div className="flex items-center gap-5">
            {/* Offices dropdown (the "map on header" entry point) */}
            <div className="relative">
              <button
                onClick={() => setOfficesOpen((v) => !v)}
                onBlur={() => setTimeout(() => setOfficesOpen(false), 150)}
                className="flex items-center gap-1.5 font-medium transition-colors hover:text-slate-900 dark:hover:text-white"
                aria-expanded={officesOpen}
              >
                <Globe className="h-3.5 w-3.5" />
                Global Offices · 9
                <ChevronDown className={`h-3 w-3 transition-transform ${officesOpen ? 'rotate-180' : ''}`} />
              </button>
              {officesOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-[28rem] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                  <div className="relative border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
                    <WorldMap
                      compact
                      active={activeOffice}
                      onPick={(o) => setActiveOffice(o)}
                    />
                  </div>
                  <div className="grid max-h-60 grid-cols-2 gap-px overflow-y-auto bg-slate-100 dark:bg-slate-800">
                    {offices.map((o) => (
                      <button
                        key={o.city}
                        onMouseEnter={() => setActiveOffice(o)}
                        onClick={() => {
                          setOfficesOpen(false)
                          scrollTo('contact')
                        }}
                        className={`flex items-start gap-2 bg-white p-3 text-left transition-colors hover:bg-purple-50 dark:bg-slate-900 dark:hover:bg-purple-950/30 ${
                          activeOffice.city === o.city ? 'bg-purple-50 dark:bg-purple-950/30' : ''
                        }`}
                      >
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-purple-600" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {o.city}
                            {o.hq && <span className="ml-1.5 rounded bg-purple-600 px-1 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">HQ</span>}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{o.country}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <span>·</span>
            <a href="#" className="transition-colors hover:text-slate-900 dark:hover:text-white">Docs</a>
            <a href="#" className="transition-colors hover:text-slate-900 dark:hover:text-white">Status</a>
            <a href="#" className="transition-colors hover:text-slate-900 dark:hover:text-white">Partners</a>
            <span>·</span>
            <button className="flex items-center gap-1 transition-colors hover:text-slate-900 dark:hover:text-white">
              <Globe className="h-3.5 w-3.5" /> EN
            </button>
          </div>
        </div>
      </div>

      {/* ───────── Header ───────── */}
      <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30">
              <Zap className="h-4 w-4" />
            </div>
            <span className="nx-gradient-text">Nexus AI</span>
            <Badge className="ml-1 hidden border-slate-200 bg-slate-100 text-[10px] font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 sm:inline-flex">
              Enterprise
            </Badge>
          </div>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-400 lg:flex">
            {nav.map((item) => (
              <a key={item} href="#" className="flex items-center gap-0.5 transition-colors hover:text-slate-900 dark:hover:text-white">
                {item}
                <ChevronDown className="h-3 w-3 opacity-60" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Button variant="ghost" className="hidden text-sm sm:inline-flex" onClick={() => scrollTo('contact')}>
              Contact Sales
            </Button>
            <Button variant="ghost" className="hidden text-sm lg:inline-flex" onClick={() => onNavigate && onNavigate('login')}>
              Sign In
            </Button>
            <Button className="hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-sm text-white shadow-lg shadow-purple-500/25 transition-shadow hover:shadow-purple-500/40 sm:inline-flex" onClick={() => onNavigate && onNavigate('register')}>
              Get Started <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <button
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-slate-200/60 bg-white/95 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/95 lg:hidden">
            <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
              {nav.map((item) => (
                <a key={item} href="#" className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
                  {item}
                </a>
              ))}
              <button onClick={() => scrollTo('contact')} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
                Contact Sales
              </button>
              <button onClick={() => scrollTo('global')} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
                Global Offices
              </button>
              <div className="flex gap-2 pt-3">
                <Button variant="outline" className="flex-1 text-sm" onClick={() => onNavigate && onNavigate('login')}>Sign In</Button>
                <Button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-sm text-white" onClick={() => onNavigate && onNavigate('register')}>Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden">
        {/* Animated gradient blobs */}
        <div className="nx-blob pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-[120px] dark:bg-purple-500/10" />
        <div className="nx-blob pointer-events-none absolute -top-20 left-1/4 h-[400px] w-[400px] rounded-full bg-indigo-500/15 blur-[100px] dark:bg-indigo-500/10" style={{ animationDelay: '-4s' }} />
        <div className="nx-blob pointer-events-none absolute top-10 right-1/4 h-[350px] w-[350px] rounded-full bg-violet-500/15 blur-[100px] dark:bg-violet-400/10" style={{ animationDelay: '-9s' }} />

        {/* Grid overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="nx-fade-up">
              <Badge className="mb-6 border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300">
                <Sparkles className="mr-1 h-3 w-3" /> Nexus AI 4.0 &mdash; Now with GPT-4o integration
              </Badge>
            </div>

            <h1 className="nx-fade-up nx-delay-1 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Analytics that{' '}
              <span className="nx-gradient-text">think for you</span>
            </h1>

            <p className="nx-fade-up nx-delay-2 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Nexus AI transforms raw data into actionable intelligence. Ask questions in plain English,
              get instant visualizations, and let AI surface the insights that matter most &mdash;
              trusted by 4,200+ teams across 60 countries.
            </p>

            <div className="nx-fade-up nx-delay-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-500/25 transition-shadow hover:shadow-purple-500/40 sm:w-auto" onClick={() => onNavigate && onNavigate('register')}>
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <PlayCircle className="mr-2 h-4 w-4" /> Watch 2-min Demo
              </Button>
            </div>

            <p className="nx-fade-up nx-delay-4 mt-4 text-xs text-slate-500 dark:text-slate-500">
              No credit card required &middot; 14-day free trial &middot; Cancel anytime
            </p>
          </div>

          {/* Hero showcase card */}
          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-violet-500/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-2xl shadow-purple-500/10 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/90">
              <div className="flex items-center gap-2 border-b border-slate-200/80 px-4 py-3 dark:border-slate-700/80">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="ml-2 text-xs text-slate-400">nexus-ai.app/dashboard</span>
              </div>
              <div className="grid grid-cols-3 gap-4 p-6">
                <div className="col-span-2 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 p-2 text-white">
                      <LineChart className="h-full w-full" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Revenue Forecast</p>
                      <p className="text-xs text-slate-500">AI-generated &middot; Updated 2m ago</p>
                    </div>
                  </div>
                  <div className="flex h-32 items-end gap-1.5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                    {[40, 55, 35, 65, 50, 75, 60, 85, 70, 90, 78, 95].map((h, i) => (
                      <div
                        key={i}
                        className="nx-bar flex-1 rounded-t-md bg-gradient-to-t from-purple-500 to-indigo-400"
                        style={{ height: `${h}%`, animationDelay: `${i * 60}ms` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 p-4 dark:from-purple-950/50 dark:to-indigo-950/50">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">MRR</p>
                    <p className="text-xl font-bold">$284K</p>
                    <p className="text-xs font-medium text-green-600">+12.4%</p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 p-4 dark:from-violet-950/50 dark:to-purple-950/50">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Active Users</p>
                    <p className="text-xl font-bold">18.2K</p>
                    <p className="text-xs font-medium text-green-600">+8.1%</p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 p-4 dark:from-indigo-950/50 dark:to-blue-950/50">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">AI Queries</p>
                    <p className="text-xl font-bold">1.4M</p>
                    <p className="text-xs font-medium text-green-600">+31%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Trusted By (animated marquee) ───────── */}
      <section className="border-y border-slate-200/60 bg-slate-50/50 dark:border-slate-800/60 dark:bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
            Trusted by data teams at 4,200+ leading companies
          </p>
          <div className="nx-marquee-pause relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="nx-marquee-track gap-12">
              {[...trustedBy, ...trustedBy, ...trustedBy].map((name, i) => (
                <span key={`${name}-${i}`} className="shrink-0 px-6 text-lg font-bold text-slate-300 transition-colors hover:text-slate-500 dark:text-slate-700 dark:hover:text-slate-500">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Features Grid ───────── */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
              Features
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                master your data
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              From ingestion to insight, Nexus AI covers the entire analytics lifecycle.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card
                key={f.title}
                className="group relative overflow-hidden border-slate-200/80 bg-white transition-all hover:shadow-xl hover:shadow-purple-500/10 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-indigo-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <CardContent className="relative p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/25">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Product Showcase ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-24 dark:bg-slate-900/50">
        <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge className="mb-4 border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300">
                Product
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Built for the way{' '}
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  modern teams work
                </span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                Nexus AI adapts to your workflow, not the other way around. Collaborate in real time,
                automate repetitive analysis, and ship insights faster than ever.
              </p>

              <div className="mt-8 space-y-5">
                {[
                  { icon: MessageSquare, title: 'Conversational Analytics', desc: 'Type a question, get a chart. It\'s that simple.' },
                  { icon: Users, title: 'Team Collaboration', desc: 'Share dashboards, leave comments, and assign follow-ups in one place.' },
                  { icon: Zap, title: 'Instant Alerts', desc: 'Get notified the moment a metric crosses a threshold you care about.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 text-white">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Showcase mockup */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl dark:border-slate-700/80 dark:bg-slate-900">
                <div className="border-b border-slate-200/80 px-4 py-3 dark:border-slate-700/80">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 p-4 dark:from-violet-950/30 dark:to-purple-950/30">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Ask Nexus AI...</p>
                    <p className="mt-1 font-medium">"Show me revenue by region for Q4, compared to last year"</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                      <span className="text-sm font-medium">North America</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded-full bg-gradient-to-r from-violet-500 to-purple-500" />
                        <span className="text-sm font-semibold">$4.2M</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                      <span className="text-sm font-medium">Europe</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 rounded-full bg-gradient-to-r from-violet-500 to-purple-500" />
                        <span className="text-sm font-semibold">$3.1M</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                      <span className="text-sm font-medium">Asia Pacific</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 rounded-full bg-gradient-to-r from-violet-500 to-purple-500" />
                        <span className="text-sm font-semibold">$2.6M</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                      <span className="text-sm font-medium">Latin America</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-10 rounded-full bg-gradient-to-r from-violet-500 to-purple-500" />
                        <span className="text-sm font-semibold">$1.1M</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Metrics / Stats ───────── */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 text-center transition-all hover:shadow-xl hover:shadow-purple-500/10 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-indigo-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <p className="relative bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-4xl font-extrabold text-transparent">
                  {s.value}
                </p>
                <p className="relative mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Pricing ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-24 dark:bg-slate-900/50">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300">
              Pricing
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Simple,{' '}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                transparent pricing
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {pricing.map((plan) => (
              <Card
                key={plan.name}
                className={`relative overflow-hidden transition-all ${
                  plan.popular
                    ? 'border-purple-500 bg-white shadow-2xl shadow-purple-500/20 dark:border-purple-500 dark:bg-slate-900'
                    : 'border-slate-200/80 bg-white hover:shadow-lg dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                {plan.popular && (
                  <div className="absolute right-4 top-4">
                    <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                      <Star className="mr-1 h-3 w-3" /> Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{plan.desc}</p>
                  <div className="mt-6">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{plan.period}</span>
                  </div>
                  <Button
                    className={`mt-6 w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40'
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                  <ul className="mt-8 space-y-3">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-600 dark:text-purple-400" />
                        <span className="text-slate-600 dark:text-slate-400">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Testimonials ───────── */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300">
              Customers
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Loved by{' '}
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                data teams everywhere
              </span>
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900">
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    "{t.quote}"
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-sm font-bold text-white">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Global Presence (World Map) ───────── */}
      <section id="global" className="relative overflow-hidden bg-slate-50 py-24 dark:bg-slate-900/50">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
              <Globe className="mr-1 h-3 w-3" /> Global Presence
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              One platform, <span className="nx-gradient-text">nine offices</span>, sixty&#8209;plus countries.
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Wherever your data lives, we have a team nearby. Regional deployment,
              local support, and data residency that meets every jurisdiction.
            </p>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-center">
            <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-indigo-500/5 dark:border-slate-800 dark:bg-slate-900 sm:p-10">
              <WorldMap
                active={activeOffice}
                onPick={(o) => setActiveOffice(o)}
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-purple-600">
                Active Office
              </p>
              <h3 className="mt-2 text-3xl font-extrabold">
                {activeOffice.city}
                {activeOffice.hq && (
                  <span className="ml-2 rounded bg-purple-600 px-2 py-0.5 align-middle text-xs font-bold uppercase tracking-wider text-white">
                    Global HQ
                  </span>
                )}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{activeOffice.country}</p>

              <div className="mt-6 space-y-3 text-sm">
                <p className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <Phone className="h-4 w-4 text-purple-600" /> {activeOffice.phone}
                </p>
                <p className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <Mail className="h-4 w-4 text-purple-600" /> {activeOffice.email}
                </p>
                <p className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <Clock className="h-4 w-4 text-purple-600" /> 24/7 enterprise support
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-2">
                {offices.map((o) => (
                  <button
                    key={o.city}
                    onMouseEnter={() => setActiveOffice(o)}
                    onClick={() => setActiveOffice(o)}
                    className={`rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all ${
                      activeOffice.city === o.city
                        ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-sm dark:border-purple-500 dark:bg-purple-950/30 dark:text-purple-300'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-purple-300 hover:text-purple-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'
                    }`}
                  >
                    {o.city}
                  </button>
                ))}
              </div>

              <Button
                className="mt-8 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
                onClick={() => scrollTo('contact')}
              >
                Contact {activeOffice.city} team <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Contact Us ───────── */}
      <section id="contact" className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <Badge className="mb-4 border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300">
                <Headphones className="mr-1 h-3 w-3" /> Contact
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Talk to a <span className="nx-gradient-text">real human</span>, not a chatbot.
              </h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                Our solutions team responds in under 4 business hours. Whether
                you&apos;re evaluating, scaling, or migrating &mdash; we&apos;re here to
                help you ship faster.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  { icon: Building2, title: 'Enterprise Sales',   desc: 'Custom deployment, SSO, SLAs, on-prem.', cta: 'sales@nexusai.com' },
                  { icon: Shield,    title: 'Security & Compliance', desc: 'Questionnaires, SOC 2 reports, pentest.', cta: 'security@nexusai.com' },
                  { icon: Headphones, title: '24/7 Support', desc: 'Priority Slack, phone, and on-call.', cta: 'support@nexusai.com' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-purple-800">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-md shadow-purple-500/25">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                      <a href={`mailto:${item.cta}`} className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400">
                        {item.cta} <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="relative overflow-hidden border-slate-200 bg-white shadow-2xl shadow-purple-500/10 dark:border-slate-800 dark:bg-slate-900">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600" />
              <CardContent className="p-8 sm:p-10">
                <h3 className="text-2xl font-bold">Get in touch</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Fill out the form and we&apos;ll be in touch within 4 business hours.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    alert('Thanks! Our team will be in touch within 4 business hours.')
                  }}
                  className="mt-6 space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ContactField label="First name" required>
                      <input required type="text" className={contactInput} placeholder="Ada" />
                    </ContactField>
                    <ContactField label="Last name" required>
                      <input required type="text" className={contactInput} placeholder="Lovelace" />
                    </ContactField>
                  </div>
                  <ContactField label="Work email" required>
                    <input required type="email" className={contactInput} placeholder="ada@company.com" />
                  </ContactField>
                  <ContactField label="Company">
                    <input type="text" className={contactInput} placeholder="Analytical Engines Inc." />
                  </ContactField>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ContactField label="Company size">
                      <select className={contactInput} defaultValue="">
                        <option value="" disabled>Select a range</option>
                        <option>1-10</option>
                        <option>11-50</option>
                        <option>51-200</option>
                        <option>201-1,000</option>
                        <option>1,001-5,000</option>
                        <option>5,000+</option>
                      </select>
                    </ContactField>
                    <ContactField label="Region">
                      <select className={contactInput} defaultValue="">
                        <option value="" disabled>Select a region</option>
                        <option>North America</option>
                        <option>EMEA</option>
                        <option>APAC</option>
                        <option>LATAM</option>
                      </select>
                    </ContactField>
                  </div>
                  <ContactField label="How can we help?">
                    <textarea rows="4" className={contactInput} placeholder="Tell us about your use case..." />
                  </ContactField>
                  <label className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <input type="checkbox" className="mt-0.5 rounded border-slate-300" />
                    <span>I agree to receive communications from Nexus AI. You can unsubscribe at any time.</span>
                  </label>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25 transition-shadow hover:shadow-purple-500/40"
                  >
                    Send message <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-center text-xs text-slate-500 dark:text-slate-500">
                    <Lock className="mr-1 inline h-3 w-3" />
                    Your data is protected by 256-bit encryption.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ───────── CTA Banner ───────── */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 px-8 py-16 text-center text-white shadow-2xl shadow-purple-500/30 sm:px-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Ready to transform your analytics?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-purple-100">
                Join 4,200+ companies using Nexus AI to make faster, smarter decisions.
                Start your free trial today.
              </p>
              <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="w-full flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-purple-200 backdrop-blur-sm focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/25"
                />
                <Button size="lg" className="w-full shrink-0 bg-white text-purple-700 shadow-lg hover:bg-purple-50 sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="mt-4 text-xs text-purple-200">
                Free 14-day trial &middot; No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Footer ───────── */}
      <footer className="border-t border-slate-200/60 bg-white dark:border-slate-800/60 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Brand + newsletter column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 text-lg font-bold">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30">
                  <Zap className="h-4 w-4" />
                </div>
                <span className="nx-gradient-text">Nexus AI</span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                AI-powered analytics for modern data teams. From query to
                insight in seconds &mdash; trusted by 4,200+ companies worldwide.
              </p>

              <form
                onSubmit={(e) => { e.preventDefault(); alert('Subscribed!') }}
                className="mt-6 max-w-sm"
              >
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Subscribe to The Data Stack &mdash; weekly
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="you@work.com"
                    className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-slate-700 dark:bg-slate-900"
                  />
                  <Button type="submit" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    Subscribe
                  </Button>
                </div>
              </form>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-500">
                <span className="flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-2 py-1 font-medium dark:border-slate-800 dark:bg-slate-900">
                  <Shield className="h-3 w-3" /> SOC 2 Type II
                </span>
                <span className="flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-2 py-1 font-medium dark:border-slate-800 dark:bg-slate-900">
                  <Shield className="h-3 w-3" /> ISO 27001
                </span>
                <span className="flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-2 py-1 font-medium dark:border-slate-800 dark:bg-slate-900">
                  <Shield className="h-3 w-3" /> HIPAA
                </span>
                <span className="flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-2 py-1 font-medium dark:border-slate-800 dark:bg-slate-900">
                  <Shield className="h-3 w-3" /> GDPR
                </span>
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold">{category}</h4>
                <ul className="mt-4 space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-slate-500 transition-colors hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200/60 pt-8 dark:border-slate-800/60 sm:flex-row">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              &copy; {new Date().getFullYear()} Nexus AI, Inc. &middot; Made with care in San Francisco, London, Singapore &amp; 6 more offices.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Github, label: 'GitHub' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Youtube, label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:-translate-y-0.5 hover:border-purple-300 hover:text-purple-600 dark:border-slate-800 dark:text-slate-400 dark:hover:border-purple-800 dark:hover:text-purple-400">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Contact form field helper                                          */
/* ------------------------------------------------------------------ */

const contactInput =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100'

function ContactField({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
        {label}{required && <span className="text-purple-600">*</span>}
      </span>
      {children}
    </label>
  )
}

/* ------------------------------------------------------------------ */
/*  SVG World Map with animated office pins                            */
/* ------------------------------------------------------------------ */

function WorldMap({ active, onPick, compact = false }) {
  return (
    <div className={`relative w-full ${compact ? 'aspect-[2/1]' : 'aspect-[2.2/1]'}`}>
      {/* Stylized dotted world background */}
      <svg
        viewBox="0 0 100 50"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full text-slate-300 dark:text-slate-700"
        aria-hidden="true"
      >
        {Array.from({ length: 22 }).map((_, row) =>
          Array.from({ length: 44 }).map((_, col) => {
            const x = col * 2.3 + 1
            const y = row * 2.3 + 1
            if (!isLandDot(x, y)) return null
            return (
              <circle
                key={`${row}-${col}`}
                cx={x}
                cy={y}
                r={0.42}
                fill="currentColor"
                opacity={0.55}
              />
            )
          })
        )}
      </svg>

      {/* Pins */}
      {offices.map((o) => {
        const isActive = active && active.city === o.city
        return (
          <button
            key={o.city}
            type="button"
            onMouseEnter={() => onPick && onPick(o)}
            onFocus={() => onPick && onPick(o)}
            onClick={() => onPick && onPick(o)}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${o.x}%`, top: `${o.y}%` }}
            aria-label={`${o.city}, ${o.country}`}
          >
            <span className={`relative block ${compact ? 'h-2 w-2' : 'h-3 w-3'}`}>
              <span
                className={`nx-pin-ring ${
                  isActive ? 'text-purple-500' : 'text-indigo-400'
                }`}
              />
              <span
                className={`relative block h-full w-full rounded-full ring-2 ring-white dark:ring-slate-900 ${
                  isActive
                    ? 'bg-gradient-to-br from-purple-500 to-indigo-600 scale-125'
                    : o.hq
                      ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
                      : 'bg-indigo-500'
                } transition-transform group-hover:scale-125`}
              />
            </span>
            {!compact && (
              <span
                className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 shadow-md transition-all dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 ${
                  isActive
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'
                }`}
              >
                {o.city}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

/* Approximate landmass: returns true for dots that should appear as land.
 * This is intentionally coarse — it paints a recognizable world silhouette
 * without shipping a heavy GeoJSON asset. */
function isLandDot(x, y) {
  const regions = [
    // North America
    { cx: 18, cy: 18, rx: 12, ry: 9 },
    { cx: 22, cy: 28, rx: 7, ry: 5 },
    // Central America
    { cx: 23, cy: 33, rx: 3, ry: 2 },
    // South America
    { cx: 29, cy: 40, rx: 5, ry: 8 },
    // Europe
    { cx: 48, cy: 20, rx: 6, ry: 5 },
    // Africa
    { cx: 51, cy: 34, rx: 7, ry: 10 },
    // Middle East
    { cx: 57, cy: 26, rx: 4, ry: 4 },
    // Russia / North Asia
    { cx: 65, cy: 18, rx: 16, ry: 5 },
    // South Asia / India
    { cx: 67, cy: 30, rx: 5, ry: 4 },
    // South-East Asia
    { cx: 73, cy: 33, rx: 4, ry: 3 },
    // East Asia
    { cx: 80, cy: 25, rx: 6, ry: 5 },
    // Japan
    { cx: 86, cy: 24, rx: 2, ry: 3 },
    // Australia
    { cx: 82, cy: 40, rx: 6, ry: 3 },
    // New Zealand
    { cx: 90, cy: 43, rx: 1.5, ry: 1.5 },
    // Indonesia strip
    { cx: 75, cy: 37, rx: 4, ry: 1.2 },
    // UK
    { cx: 46, cy: 17, rx: 1.5, ry: 2 },
    // Greenland
    { cx: 38, cy: 8, rx: 4, ry: 3 },
  ]
  for (const r of regions) {
    const dx = (x - r.cx) / r.rx
    const dy = (y - r.cy) / r.ry
    if (dx * dx + dy * dy <= 1) return true
  }
  return false
}
