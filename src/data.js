// Root Cause — UK Issues Data (Evidence-Based)
// Sources: ONS, IFS, King's Fund, LSE, House of Commons Library, Joseph Rowntree Foundation,
// Migration Advisory Committee, Climate Change Committee, Education Policy Institute, and others.
//
// Node types: problem, cause, solution, policy
// Edge types: causes, solves, implements
// Feasibility fields (solutions/policies): politicalDifficulty, economicDifficulty, practicality (1-5), sideEffectRisk

export const nodes = [
  // ════════════════════════════════════════════════
  //  TOP-LEVEL PROBLEMS
  // ════════════════════════════════════════════════
  {
    id: 'housing_unaffordable',
    label: 'Housing is\nUnaffordable',
    type: 'problem',
    description: 'The average UK house price is over 8× median earnings. Only 29% of new builds are in highest-demand areas. Homeownership among under-35s has halved since the 1990s.',
    sources: ['ONS House Price Index', 'LSE Housing & Communities', 'Resolution Foundation'],
  },
  {
    id: 'nhs_crisis',
    label: 'NHS in\nCrisis',
    type: 'problem',
    description: '7.6 million people on waiting lists. 110,000+ NHS vacancies. 13,600 hospital beds/day blocked by social care failures. £1.4bn overspend in 2023-24. A&E waits at record highs.',
    sources: ['NHS England', 'King\'s Fund', 'BMA', 'Nuffield Trust'],
  },
  {
    id: 'cost_of_living',
    label: 'Cost of Living\nCrisis',
    type: 'problem',
    description: 'Food prices up 37% since 2020. Energy bills doubled 2021-2023. 7 million low-income households forgoing basics. Rents rose 30% between 2021-2025. Real disposable income falling.',
    sources: ['House of Commons Library', 'ONS CPI', 'Joseph Rowntree Foundation', 'Institute for Government'],
  },
  {
    id: 'low_growth',
    label: 'Low Economic\nGrowth',
    type: 'problem',
    description: 'UK productivity is 15-20% below France, Germany, and the US. Business investment is lowest in the G7. The UK has a capital gap of trillions vs peers. GDP per capita growth has flatlined since 2008.',
    sources: ['ONS Productivity Bulletin', 'OECD Economic Surveys', 'Bank of England'],
  },
  {
    id: 'inequality',
    label: 'Regional\nInequality',
    type: 'problem',
    description: 'Persistent gaps in employment, health, and education between London/SE and the rest of the UK. The IFS found "glacial" progress on levelling up. Life expectancy varies by 20 years between areas.',
    sources: ['IFS', 'Institute for Government', 'Harvard UK Regional Growth Project', 'Levelling Up Annual Report 2024-25'],
  },
  {
    id: 'education_crisis',
    label: 'Education &\nSkills Gap',
    type: 'problem',
    description: 'Attainment gaps between disadvantaged and affluent pupils widened post-pandemic. Only 29% of Free School Meal pupils go to university vs 49% of peers. Employer-reported skills shortages growing.',
    sources: ['Education Policy Institute', 'Sutton Trust', 'IFS Education Spending Report', 'House of Commons POST'],
  },
  {
    id: 'climate_challenge',
    label: 'Climate &\nEnergy Transition',
    type: 'problem',
    description: 'UK has legally binding net zero by 2050 target. Emissions halved since 1990 but current pace may miss 2030 renewables targets. Grid capacity constraints and supply chain bottlenecks threaten progress.',
    sources: ['Climate Change Committee', 'House of Commons Library', 'Chapter Zero', 'Deloitte UK Energy Transition'],
  },
  {
    id: 'crime_social',
    label: 'Crime & Social\nBreakdown',
    type: 'problem',
    description: 'ASB hotspots correlate with deprivation. Prison overcrowding with severe violence and self-harm. Youth services cut by 70% since 2010. Neighbourhood policing hollowed out.',
    sources: ['HMICFRS', 'Institute for Government', 'Home Office', 'State of Policing Report 2024-25'],
  },
  {
    id: 'democratic_deficit',
    label: 'Democratic\nDeficit',
    type: 'problem',
    description: 'UK voter turnout has declined from 77% (1992) to 60% (2024). Trust in politicians is at historic lows — only 12% trust government to put country first (Ipsos 2024). Millions feel politically unrepresented, especially young, ethnic minority, and working-class voters.',
    sources: ['Electoral Commission', 'Ipsos Veracity Index 2024', 'British Social Attitudes Survey', 'Hansard Society Audit of Political Engagement'],
  },

  // ════════════════════════════════════════════════
  //  INTERMEDIATE CAUSES
  // ════════════════════════════════════════════════

  // --- Housing ---
  {
    id: 'housing_supply',
    label: 'Insufficient\nHousing Supply',
    type: 'cause',
    description: 'The UK builds ~230k homes/year vs 300k+ needed. Only 29% of new builds in highest-demand areas (Warwick study). The planning system blocks development most where it\'s needed most.',
    sources: ['MHCLG', 'Warwick University', 'Centre for Cities'],
  },
  {
    id: 'high_rents',
    label: 'High Rents',
    type: 'cause',
    description: 'Private rents rose 30% between 2021-2025, consuming 30-50% of income in many areas. Renters can\'t save for deposits, trapping them in expensive private renting.',
    sources: ['ONS Private Rental Index', 'Shelter', 'Resolution Foundation'],
  },
  {
    id: 'financialisation',
    label: 'Housing\nFinancialisation',
    type: 'cause',
    description: 'Housing treated as a financial asset rather than a need. Buy-to-let expanded 350% since 2000. Foreign investment and REITs inflated prices further (UCL research).',
    sources: ['UCL Institute for Innovation', 'NEF 2024', 'Bank of England'],
  },

  // --- NHS ---
  {
    id: 'nhs_underfunding',
    label: 'NHS\nUnderfunding',
    type: 'cause',
    description: 'Health spending growth was the slowest in NHS history 2010-2019, averaging 1.4%/year vs historical 3.7%. Capital investment deferred for decades, leaving crumbling estates.',
    sources: ['King\'s Fund', 'IFS', 'NHS Confederation'],
  },
  {
    id: 'staff_shortages',
    label: 'Healthcare\nStaff Shortages',
    type: 'cause',
    description: '110,000+ NHS vacancies including 40,000 nursing posts. Medical school places were frozen for a decade. Brexit cut EU staff pipeline. Burnout drives 1 in 4 to consider leaving.',
    sources: ['NHS Digital', 'BMA', 'Health Foundation', 'Nuffield Trust'],
  },
  {
    id: 'social_care_failure',
    label: 'Social Care\nFailure',
    type: 'cause',
    description: '13,600 hospital beds/day blocked by patients who can\'t be discharged due to inadequate social care. The sector has 165,000 vacancies. Successive governments have failed to reform it.',
    sources: ['King\'s Fund', 'NHS England', 'Care Quality Commission'],
  },

  // --- Cost of Living ---
  {
    id: 'high_energy_prices',
    label: 'High Energy\nPrices',
    type: 'cause',
    description: 'Average annual energy bills doubled from ~£1,200 to £2,500+ between 2021-2023. 10 million households experienced fuel poverty. Poor housing insulation exacerbates costs.',
    sources: ['Ofgem', 'National Energy Action', 'ONS'],
  },
  {
    id: 'food_inflation',
    label: 'Food Price\nInflation',
    type: 'cause',
    description: 'UK food prices increased 37.2% between Aug 2020 and Aug 2025, driven by energy/transport costs, Brexit import disruption, and currency weakness. 5 million households experienced food insecurity.',
    sources: ['ONS CPI', 'House of Commons Library', 'Food Foundation'],
  },
  {
    id: 'wage_stagnation',
    label: 'Wage\nStagnation',
    type: 'cause',
    description: 'The worst period for real wage growth since the Napoleonic Wars. A decade of flat real wages post-2008. Only half of workers believe pay keeps up with costs (Lancaster University 2025).',
    sources: ['Resolution Foundation', 'Lancaster Work Foundation', 'IFS'],
  },
  {
    id: 'tax_burden',
    label: 'Rising Tax\nBurden',
    type: 'cause',
    description: 'Frozen tax thresholds since 2021 are dragging millions into higher tax bands via "fiscal drag". National Insurance rises add to employer and employee costs. Tax as % of GDP at 70-year high.',
    sources: ['IFS', 'OBR', 'House of Commons Library'],
  },
  {
    id: 'childcare_costs',
    label: 'Childcare\nCosts',
    type: 'cause',
    description: 'UK has the most expensive childcare in the OECD. Full-time nursery for under-2 averages £14,000-£15,000/year. A couple with two children can spend 29% of household income on childcare — more than rent in many areas. 1.7 million parents held back from work.',
    sources: ['Coram Family & Childcare Survey 2024', 'OECD Family Database', 'TUC', 'IFS'],
  },
  {
    id: 'childcare_supply_shortage',
    label: 'Childcare\nSupply Shortage',
    type: 'cause',
    description: 'Over 5,000 childcare providers closed 2019-2024. Rural and deprived areas worst affected — "childcare deserts" where demand far exceeds places. Staff-to-child ratios among strictest in Europe but funded at below-cost rates.',
    sources: ['Ofsted', 'Coram Family & Childcare', 'Sutton Trust', 'Early Years Alliance'],
  },
  {
    id: 'childcare_workforce_crisis',
    label: 'Childcare\nWorkforce Crisis',
    type: 'cause',
    description: 'Average nursery worker earns £10-11/hour — barely above minimum wage for Level 3 qualified roles. 40% turnover rate annually. 84% of settings struggle to recruit. Low pay and high burnout drive experienced staff out.',
    sources: ['Early Years Alliance', 'NDNA Workforce Survey', 'Education Policy Institute'],
  },
  {
    id: 'inadequate_parental_leave',
    label: 'Inadequate\nParental Leave',
    type: 'cause',
    description: 'UK statutory maternity pay (£184.03/week after 6 weeks at 90% pay) is among the lowest in Europe. Shared parental leave uptake is only 2-8% due to pay gap and employer culture. Paternity leave is 2 weeks. Pushes families to need childcare earlier.',
    sources: ['TUC', 'Working Families', 'CIPD', 'EHRC'],
  },
  {
    id: 'maternal_employment_penalty',
    label: 'Maternal\nEmployment Penalty',
    type: 'cause',
    description: 'UK mothers earn 40% less per hour than equivalent women without children by age 42 (IFS). Driven by forced career breaks, part-time work due to childcare costs, and workplace discrimination. 54,000 women/year lose jobs due to pregnancy/maternity.',
    sources: ['IFS', 'EHRC', 'Fawcett Society', 'TUC'],
  },

  // --- Economic Growth ---
  {
    id: 'low_productivity',
    label: 'Low\nProductivity',
    type: 'cause',
    description: 'UK output per hour is 16% below the G7 average. Lowest capital investment in the G7 over 40 years (19% of GDP). Weak management practices and poor technology adoption.',
    sources: ['ONS', 'OECD', 'McKinsey Global Institute'],
  },
  {
    id: 'low_investment',
    label: 'Low Business\nInvestment',
    type: 'cause',
    description: 'UK business investment as % of GDP is lowest in the G7. Policy uncertainty, tax changes, and Brexit have suppressed capital spending. R&D intensity below OECD average.',
    sources: ['ONS', 'CBI', 'Bank of England', 'OECD'],
  },

  // --- Regional ---
  {
    id: 'london_centrism',
    label: 'London-Centric\nEconomy',
    type: 'cause',
    description: 'London receives disproportionate public R&D spending, infrastructure investment, and talent. Centralised control over policy and funding leaves other regions without investment needed to compete.',
    sources: ['Harvard UK Regional Growth Project', 'Centre for Cities', 'IFS'],
  },
  {
    id: 'uneven_devolution',
    label: 'Uneven\nDevolution',
    type: 'cause',
    description: 'The UK\'s asymmetric devolution gives some areas powers but not others. Resources often insufficient for transformative change. 80% of England covered by some devolution, but quality is patchy.',
    sources: ['LSE Inequalities', 'RSA', 'Levelling Up Annual Report'],
  },

  // --- Education ---
  {
    id: 'school_funding_squeeze',
    label: 'School Funding\nSqueeze',
    type: 'cause',
    description: 'Real-terms funding per pupil eroded by rising costs, especially SEND. Deprived areas received 30% more per pupil in 2013 vs only 20% more by 2021. The gap in support is narrowing at the wrong end.',
    sources: ['IFS Education Report', 'Education Policy Institute', 'Sutton Trust'],
  },
  {
    id: 'skills_mismatch',
    label: 'Skills\nMismatch',
    type: 'cause',
    description: 'Underinvestment in vocational/technical education. ~50% of young people not on academic track lack clear progression routes. Employers report growing digital and technical skills gaps.',
    sources: ['LSE CEP', 'CBI Education & Skills Survey', 'OECD Skills Outlook'],
  },
  {
    id: 'attainment_gap',
    label: 'Attainment\nGap',
    type: 'cause',
    description: 'Disadvantaged pupils are months to years behind peers in attainment. The gap widened post-pandemic. Catchment-area admissions entrench inequality as affluent families buy into better school zones.',
    sources: ['Education Policy Institute', 'Sutton Trust', 'University of Bath 2025'],
  },

  // --- Climate ---
  {
    id: 'grid_constraints',
    label: 'Grid Capacity\nConstraints',
    type: 'cause',
    description: 'While 45% of electricity is from renewables, ageing grid infrastructure can\'t handle the needed expansion. Connection delays and supply chain bottlenecks threaten 2030 clean power targets.',
    sources: ['National Grid ESO', 'Climate Change Committee', 'Ofgem'],
  },
  {
    id: 'green_skills_gap',
    label: 'Green Skills\nShortage',
    type: 'cause',
    description: 'The energy transition needs 480,000 green jobs by 2030 but supply chains for heat pumps, EVs, and renewables require rapid upskilling that isn\'t happening fast enough.',
    sources: ['Green Jobs Taskforce', 'CCC', 'BEIS'],
  },

  // --- Crime & Social ---
  {
    id: 'policing_cuts',
    label: 'Policing\nCuts',
    type: 'cause',
    description: 'Fewer neighbourhood officers, less visible policing, and delayed responses to community concerns since 2010 funding cuts. Specialist capacity for complex cases (mental health, substance abuse) diminished.',
    sources: ['HMICFRS', 'State of Policing Report', 'Home Office'],
  },
  {
    id: 'youth_service_cuts',
    label: 'Youth Service\nCuts',
    type: 'cause',
    description: 'Youth services cut by ~70% since 2010. Loss of diversionary activities, mentoring, and safe spaces for young people. Strong correlation between youth service cuts and rising youth crime.',
    sources: ['YMCA', 'National Youth Agency', 'LGA'],
  },
  {
    id: 'mental_health_crisis',
    label: 'Mental Health\nCrisis',
    type: 'cause',
    description: 'Demand for mental health services has surged post-pandemic while provision remains inadequate. Long waits for CAMHS. Adult mental health beds cut by 25% since 2010.',
    sources: ['Mind', 'NHS Digital', 'Royal College of Psychiatrists'],
  },
  {
    id: 'prison_overcrowding',
    label: 'Prison\nOvercrowding',
    type: 'cause',
    description: 'UK prisons at 99%+ capacity with severe violence, drug use, and self-harm. Conditions undermine rehabilitation. Reoffending rates over 40%. Custodial sentences expanding without addressing root causes.',
    sources: ['Institute for Government', 'Prison Reform Trust', 'JUSTICE'],
  },

  // Democracy & representation
  {
    id: 'voter_apathy',
    label: 'Voter\nApathy',
    type: 'cause',
    description: 'Turnout at 2024 general election was 60% — the second-lowest since 1918. Among 18-24s turnout was ~47%. Many feel voting changes nothing. Sense of disenfranchisement highest in deprived areas.',
    sources: ['Electoral Commission', 'British Election Study', 'Hansard Society'],
  },
  {
    id: 'fptp_system',
    label: 'FPTP Voting\nSystem',
    type: 'cause',
    description: 'First Past The Post creates safe seats where millions of votes have no impact. In 2024, Labour won 63% of seats with 34% of votes. Smaller parties structurally underrepresented, discouraging participation.',
    sources: ['Electoral Reform Society', 'Make Votes Matter', 'House of Commons Library'],
  },
  {
    id: 'political_disconnect',
    label: 'Political\nDisconnect',
    type: 'cause',
    description: 'Politicians increasingly drawn from narrow social backgrounds — 2/3 of PM\'s cabinet educated at private schools. Policy priorities often misaligned with public concerns. Revolving door between politics and lobbying erodes trust.',
    sources: ['Sutton Trust', 'Social Mobility Commission', 'Transparency International UK'],
  },
  {
    id: 'media_concentration',
    label: 'Media\nConcentration',
    type: 'cause',
    description: 'Three companies control 90% of UK newspaper circulation. Billionaire-owned outlets shape political narratives. Local journalism decimated — 300+ local papers closed since 2005. News deserts in deprived areas.',
    sources: ['Media Reform Coalition', 'Cairncross Review', 'Public Interest News Foundation'],
  },
  {
    id: 'demographic_turnout_gap',
    label: 'Demographic\nTurnout Gap',
    type: 'cause',
    description: 'Stark turnout gaps: 47% for 18-24 vs 74% for 65+. Parties rationally target older, wealthier voters, creating policy feedback loop. Young people\'s issues (housing, climate) deprioritised.',
    sources: ['British Election Study', 'Ipsos MORI', 'Electoral Commission'],
  },
  {
    id: 'lobbying_influence',
    label: 'Corporate\nLobbying',
    type: 'cause',
    description: 'UK lobbying industry worth £2bn+. Only a fraction of lobbying contacts disclosed. Access to ministers disproportionately favours corporate interests over public interest groups. Weakens democratic accountability.',
    sources: ['Transparency International UK', 'openDemocracy', 'Spinwatch'],
  },

  // ════════════════════════════════════════════════
  //  ROOT CAUSES (deepest structural factors)
  // ════════════════════════════════════════════════
  {
    id: 'planning_system',
    label: 'Restrictive\nPlanning System',
    type: 'cause',
    description: 'The UK planning system — particularly green belt policy and NIMBY opposition — blocks housing where it\'s needed most. Only 29% of new builds in highest-demand areas (LSE, Warwick studies).',
    sources: ['LSE', 'Warwick University', 'CPRE'],
  },
  {
    id: 'land_banking',
    label: 'Land\nBanking',
    type: 'cause',
    description: 'Large developers sit on planning permissions for hundreds of thousands of homes, drip-feeding supply to maintain prices. NEF 2024 found this as a primary supply constraint.',
    sources: ['NEF 2024', 'Shelter', 'House of Commons HCLG Committee'],
  },
  {
    id: 'brexit_impact',
    label: 'Brexit Trade\nBarriers',
    type: 'cause',
    description: 'Leaving the EU single market created new trade friction (4-5% trade reduction per OBR), reduced labour supply in key sectors, and increased food/goods costs for businesses and consumers.',
    sources: ['OBR', 'UK Trade Policy Observatory', 'LSE CEP'],
  },
  {
    id: 'austerity',
    label: 'Decade of\nAusterity',
    type: 'cause',
    description: 'Public spending cuts 2010-2019 reduced investment in health, education, policing, local government, and infrastructure. Local authority budgets cut by nearly 50% in real terms.',
    sources: ['IFS', 'Institute for Government', 'NAO'],
  },
  {
    id: 'gas_dependency',
    label: 'Gas\nDependency',
    type: 'cause',
    description: 'The UK relies on natural gas for ~80% of home heating and ~40% of electricity, making it acutely vulnerable to global price shocks. 85% of homes have gas boilers.',
    sources: ['BEIS', 'Climate Change Committee', 'Ofgem'],
  },
  {
    id: 'global_energy_shocks',
    label: 'Global Energy\nShocks',
    type: 'cause',
    description: 'Russia\'s invasion of Ukraine caused wholesale gas prices to spike 10×. Combined with post-pandemic supply disruption, this was the proximate trigger for the cost of living crisis.',
    sources: ['Ofgem', 'IEA', 'Bank of England'],
  },
  {
    id: 'training_failures',
    label: 'Training &\nEducation Gaps',
    type: 'cause',
    description: 'Medical school places frozen for a decade. Apprenticeship starts fell 36% since the levy was introduced. FE college funding cut 12% in real terms since 2010. Technical education undervalued.',
    sources: ['IFS', 'Sutton Trust', 'BMA', 'Association of Colleges'],
  },
  {
    id: 'poor_infrastructure',
    label: 'Poor Transport\nInfrastructure',
    type: 'cause',
    description: 'Outside London, transport links are slow, unreliable, and underfunded. UK has the lowest G7 infrastructure investment at 19% of GDP over 40 years. HS2 cancellation beyond Birmingham deepened the gap.',
    sources: ['National Infrastructure Commission', 'IFS', 'Transport for the North'],
  },
  {
    id: 'weak_unions',
    label: 'Weakened\nTrade Unions',
    type: 'cause',
    description: 'Union membership halved from 13m to 6.4m since 1979. Bargaining power decline means productivity gains flow to profits not wages. The UK has the weakest collective bargaining in Western Europe.',
    sources: ['BEIS Trade Union Statistics', 'ILO', 'TUC'],
  },
  {
    id: 'short_termism',
    label: 'Political\nShort-Termism',
    type: 'cause',
    description: '5-year electoral cycles incentivise quick fixes over structural reform. Major projects (HS2, nuclear, planning reform) are repeatedly delayed, cancelled, or reversed by incoming governments.',
    sources: ['Institute for Government', 'Constitution Unit UCL'],
  },
  {
    id: 'centralised_governance',
    label: 'Centralised\nGovernance',
    type: 'cause',
    description: 'The UK is one of the most fiscally centralised developed countries. Local authorities raise only ~5% of tax revenue vs 50%+ in federal systems. Westminster controls funding, policy, and priorities.',
    sources: ['OECD Fiscal Decentralisation', 'LSE', 'Centre for Cities'],
  },
  {
    id: 'population_pressure',
    label: 'Population\nGrowth Pressure',
    type: 'cause',
    description: 'Net migration peaked at 906,000 (year to June 2023) before falling to ~204,000 by mid-2025. Population growth adds demand for housing, healthcare, and schools, straining capacity if not matched by investment.',
    sources: ['Migration Advisory Committee', 'Oxford Migration Observatory', 'OBR'],
  },
  {
    id: 'poverty_deprivation',
    label: 'Poverty &\nDeprivation',
    type: 'cause',
    description: 'Poverty is a central risk factor for crime, poor health, low attainment, and social breakdown. Welfare retrenchment post-2010 deepened hardship. 4.3 million children live in poverty.',
    sources: ['Joseph Rowntree Foundation', 'Child Poverty Action Group', 'Social Metrics Commission'],
  },
  { id: 'fiscal_drag', label: 'Fiscal Drag\n(Stealth Tax)', type: 'cause', description: 'Frozen income tax thresholds (personal allowance £12,570, higher rate £50,270) until at least 2028 drag more earners into higher brackets as wages rise. By 2031, an estimated 5.2 million additional people will pay income tax, and 920,000 more will become higher-rate taxpayers. The average taxpayer loses ~£1,300/year vs inflation-linked thresholds. Disproportionately hits middle earners (£35k-£60k), increasing effective inequality.', sources: ['House of Commons Library', 'IFS', 'OBR'] },
  { id: 'us_tariffs', label: 'US Trade\nTariffs', type: 'cause', description: 'Trump-era tariffs impose a blanket 10% levy on UK exports to the US, with steel/aluminium at 25-50%. Up to 32% of UK exporters report direct impact. Bank of England models show UK GDP could be 2.5% lower after 3 years of sustained trade friction. The May 2025 US-UK Economic Prosperity Deal offers limited relief via quotas but most goods remain exposed. UK lacks EU-scale negotiating leverage post-Brexit.', sources: ['House of Commons Library', 'LSE', 'CEPR'] },
  { id: 'financial_services_erosion', label: 'Financial Services\nErosion', type: 'cause', description: 'Post-Brexit loss of EU passporting rights has cost London ~40,000 financial sector jobs. Financial services output grew just 2.8% since 2016 vs 10% for overall GVA. IPO fundraising at 30-year low. Paris overtook London as Europe\'s largest stock market in 2022. The sector\'s share of GDP fell from 12.4% (2008) to 8.6%. EU Capital Requirements Directive (2027) will further restrict non-EU banks serving EU clients from London.', sources: ['Economics Observatory', 'City of London Corp', 'Insurance Journal'] },
  { id: 'workforce_immigration_dependency', label: 'Workforce\nImmigration Gap', type: 'cause', description: 'UK health, social care, agriculture, hospitality and construction sectors are critically dependent on immigrant labour due to chronic domestic worker shortages. Over 55% of public want immigration reduced overall, but majorities support increases for doctors, nurses and care workers. New salary thresholds and care visa restrictions (2025) directly conflict with sectoral needs, creating a policy paradox where electoral pressures drive restrictions that worsen the staffing crisis.', sources: ['Migration Observatory', 'British Future/Ipsos', 'MAC'] },

  // ════════════════════════════════════════════════
  //  SOLUTIONS
  // ════════════════════════════════════════════════
  {
    id: 'sol_planning_reform',
    label: 'Planning\nReform',
    type: 'solution',
    description: 'Reform the planning system to allow more housebuilding, particularly on brownfield land and low-value green belt near transport links. Streamline approvals for infrastructure.',
    politicalDifficulty: 'hard',
    economicDifficulty: 'easy',
    practicality: 4,
    sideEffectRisk: 'medium',
    riskDetail: 'NIMBY backlash, potential green space loss, political cost in home counties',
    sources: ['LSE', 'Centre for Cities', 'CPRE'],
  },
  {
    id: 'sol_social_housing',
    label: 'Build Social\nHousing',
    type: 'solution',
    description: 'A massive programme of council and social housing construction (~100,000/year) to provide affordable homes and reduce private market pressure.',
    politicalDifficulty: 'medium',
    economicDifficulty: 'hard',
    practicality: 3,
    sideEffectRisk: 'low',
    riskDetail: 'Requires large capital investment; construction capacity constraints',
    sources: ['Shelter', 'Joseph Rowntree Foundation', 'MHCLG'],
  },
  {
    id: 'sol_rent_controls',
    label: 'Rent\nRegulation',
    type: 'solution',
    description: 'Implement rent stabilisation measures to prevent excessive increases. Scotland introduced rent caps in 2022; evidence is mixed on long-term supply effects.',
    politicalDifficulty: 'medium',
    economicDifficulty: 'medium',
    practicality: 3,
    sideEffectRisk: 'high',
    riskDetail: 'Risk of reducing rental supply, landlord disinvestment, black market rents',
    sources: ['Resolution Foundation', 'Scottish Government Review', 'OECD Housing'],
  },
  {
    id: 'sol_nhs_funding',
    label: 'Increase NHS\nFunding',
    type: 'solution',
    description: 'Increase NHS funding to match European averages (~11% of GDP). Focus on primary care, prevention, capital investment, and technology to reduce demand on acute services.',
    politicalDifficulty: 'easy',
    economicDifficulty: 'hard',
    practicality: 4,
    sideEffectRisk: 'low',
    riskDetail: 'Tax rises needed to fund; risk of money going to inefficiency without reform',
    sources: ['King\'s Fund', 'Health Foundation', 'Nuffield Trust'],
  },
  {
    id: 'sol_social_care_reform',
    label: 'Social Care\nReform',
    type: 'solution',
    description: 'Create a properly funded, integrated social care system. Cap care costs, improve pay for carers (currently below retail wages), and free up 13,600 blocked hospital beds/day.',
    politicalDifficulty: 'hard',
    economicDifficulty: 'hard',
    practicality: 3,
    sideEffectRisk: 'low',
    riskDetail: 'Huge fiscal cost (~£10bn+/year); political difficulty of funding mechanism (inheritance tax, NI)',
    sources: ['King\'s Fund', 'Dilnot Commission', 'CQC'],
  },
  {
    id: 'sol_train_staff',
    label: 'Train More\nHealthcare Staff',
    type: 'solution',
    description: 'Double medical school places, improve NHS pay and conditions, and create fast-track training routes. Address the 110,000+ vacancy crisis through domestic pipeline not just immigration.',
    politicalDifficulty: 'easy',
    economicDifficulty: 'medium',
    practicality: 3,
    sideEffectRisk: 'low',
    riskDetail: 'Takes 5-10 years for doctors to qualify; nursing training faster but still needs funding',
    sources: ['BMA', 'Health Education England', 'NHS Long Term Workforce Plan'],
  },
  {
    id: 'sol_renewables',
    label: 'Accelerate\nRenewables',
    type: 'solution',
    description: 'Massively expand offshore wind, solar, and nuclear capacity. Reduce gas dependency and lower long-term energy costs. UK targets clean power by 2030.',
    politicalDifficulty: 'medium',
    economicDifficulty: 'medium',
    practicality: 4,
    sideEffectRisk: 'medium',
    riskDetail: 'Planning battles for onshore wind/solar; grid upgrade costs; intermittency management',
    sources: ['Climate Change Committee', 'National Grid ESO', 'DESNZ'],
  },
  {
    id: 'sol_insulation',
    label: 'Home\nInsulation',
    type: 'solution',
    description: 'A national programme to insulate the UK\'s 19 million poorly-insulated homes, reducing energy demand, bills, and emissions. Saves £300-600/year per home.',
    politicalDifficulty: 'easy',
    economicDifficulty: 'medium',
    practicality: 4,
    sideEffectRisk: 'low',
    riskDetail: 'Workforce availability; quality control of installations; upfront cost per home £5-15k',
    sources: ['CCC', 'Energy Saving Trust', 'UK Green Building Council'],
  },

  // Childcare solutions
  {
    id: 'sol_universal_childcare',
    label: 'Universal\nChildcare',
    type: 'solution',
    description: 'Fully funded universal childcare from 9 months, as in Nordic countries. Quebec\'s $7/day programme increased maternal employment by 8% and paid for itself through increased tax revenue within 5 years. UK\'s 30-hour "free" entitlement is underfunded at £5.62/hour vs £8+ actual cost.',
    politicalDifficulty: 'medium',
    economicDifficulty: 'hard',
    practicality: 3,
    sideEffectRisk: 'medium',
    riskDetail: 'Massive upfront cost (£8-15bn), risk of quality dilution if expanded too fast, workforce supply constraint',
    sources: ['IFS', 'Women\'s Budget Group', 'Sutton Trust', 'OECD'],
  },
  {
    id: 'sol_childcare_workforce_pay',
    label: 'Childcare\nWorker Pay',
    type: 'solution',
    description: 'Professionalise the early years workforce with graduate-led provision and pay parity with primary school teachers. Requires raising hourly rates from £10-11 to £15-18. Evidence from New Zealand and France shows quality and retention improvements.',
    politicalDifficulty: 'medium',
    economicDifficulty: 'medium',
    practicality: 3,
    sideEffectRisk: 'low',
    riskDetail: 'Increased costs passed to parents unless subsidised; transition period of workforce shortage',
    sources: ['Early Years Alliance', 'Education Policy Institute', 'NDNA'],
  },
  {
    id: 'sol_parental_leave_reform',
    label: 'Parental Leave\nReform',
    type: 'solution',
    description: 'Extend paid parental leave to 12 months at 80%+ pay (Nordic model). Ring-fence 3 months for fathers/"use it or lose it" to boost uptake. Iceland\'s model achieved 90% father uptake and measurably reduced gender pay gap.',
    politicalDifficulty: 'medium',
    economicDifficulty: 'medium',
    practicality: 4,
    sideEffectRisk: 'low',
    riskDetail: 'SME burden without government subsidy; cultural resistance to father leave',
    sources: ['TUC', 'Working Families', 'OECD Family Policy Database', 'Fawcett Society'],
  },
  {
    id: 'sol_flexible_working',
    label: 'Right to\nFlexible Working',
    type: 'solution',
    description: 'Strengthen the right to flexible working from day one (partially implemented in Employment Relations Act 2023). Evidence shows flexible working increases maternal retention by 20% and reduces childcare costs. Requires culture shift and enforcement.',
    politicalDifficulty: 'easy',
    economicDifficulty: 'easy',
    practicality: 4,
    sideEffectRisk: 'low',
    riskDetail: 'Not all jobs can be flexible; risk of informal discrimination against those who use it',
    sources: ['CIPD', 'Timewise', 'Working Families', 'EHRC'],
  },
  {
    id: 'sol_industrial_strategy',
    label: 'Industrial\nStrategy',
    type: 'solution',
    description: 'A long-term, cross-party industrial strategy targeting green tech, advanced manufacturing, and life sciences. Direct investment, build supply chains, create high-skill jobs across regions.',
    politicalDifficulty: 'medium',
    economicDifficulty: 'medium',
    practicality: 3,
    sideEffectRisk: 'medium',
    riskDetail: 'Risk of political direction of investment; picking winners; requires cross-party buy-in to survive elections',
    sources: ['IPPR', 'Bennett Institute Cambridge', 'Make UK'],
  },
  {
    id: 'sol_devolution',
    label: 'Real Fiscal\nDevolution',
    type: 'solution',
    description: 'Transfer genuine fiscal and policy power to regions and metro mayors. Give local authorities the ability to raise and retain taxes, set policy priorities, and finance their own growth strategies.',
    politicalDifficulty: 'hard',
    economicDifficulty: 'medium',
    practicality: 3,
    sideEffectRisk: 'medium',
    riskDetail: 'Risks of uneven capacity; some areas may lack institutional strength; Westminster reluctance to cede control',
    sources: ['LSE', 'Centre for Cities', 'RSA', 'OECD'],
  },
  {
    id: 'sol_transport_investment',
    label: 'Regional Transport\nInvestment',
    type: 'solution',
    description: 'Major investment in rail, bus, and cycling infrastructure outside London. Connect regional economies. Per capita transport spend outside London is a fraction of London\'s.',
    politicalDifficulty: 'medium',
    economicDifficulty: 'hard',
    practicality: 3,
    sideEffectRisk: 'low',
    riskDetail: 'Long delivery timescales (10-20 years for rail); planning challenges; requires sustained commitment',
    sources: ['Transport for the North', 'National Infrastructure Commission', 'IFS'],
  },
  {
    id: 'sol_trade_alignment',
    label: 'Closer EU\nTrade Alignment',
    type: 'solution',
    description: 'Negotiate SPS agreement, mutual recognition of standards, and reduced customs friction to cut the 4-5% trade penalty identified by the OBR. Not full re-joining.',
    politicalDifficulty: 'hard',
    economicDifficulty: 'easy',
    practicality: 4,
    sideEffectRisk: 'medium',
    riskDetail: 'Politically toxic for both main parties; seen as "undoing Brexit"; requires EU willingness',
    sources: ['OBR', 'UK Trade Policy Observatory', 'LSE CEP'],
  },
  {
    id: 'sol_skills_investment',
    label: 'Skills & Training\nInvestment',
    type: 'solution',
    description: 'Reform apprenticeship levy into a flexible skills levy. Invest in FE colleges. Expand technical education routes aligned with employer needs. Address the 50% of young people without a university path.',
    politicalDifficulty: 'easy',
    economicDifficulty: 'medium',
    practicality: 4,
    sideEffectRisk: 'low',
    riskDetail: 'Takes years to see impact; risk of training for obsolete skills if not employer-led',
    sources: ['IFS', 'Sutton Trust', 'CBI', 'Association of Colleges'],
  },
  {
    id: 'sol_wage_policy',
    label: 'Stronger Wage\nPolicies',
    type: 'solution',
    description: 'Continue raising the minimum wage towards a real living wage. Strengthen collective bargaining rights. Incentivise employers to share productivity gains with workers.',
    politicalDifficulty: 'medium',
    economicDifficulty: 'medium',
    practicality: 4,
    sideEffectRisk: 'medium',
    riskDetail: 'Higher labour costs may reduce employment in marginal sectors; small business impact',
    sources: ['Low Pay Commission', 'Resolution Foundation', 'TUC'],
  },
  {
    id: 'sol_drug_reform',
    label: 'Drug Policy\nReform',
    type: 'solution',
    description: 'Shift from criminalisation to a public health approach to drug addiction. Invest in treatment, diversion schemes, and harm reduction. Evidence from Portugal shows 50% reduction in drug deaths.',
    politicalDifficulty: 'hard',
    economicDifficulty: 'easy',
    practicality: 4,
    sideEffectRisk: 'medium',
    riskDetail: 'Tabloid/public backlash; perceived as "soft on crime"; requires cross-department coordination',
    sources: ['UK Parliament POST', 'Transform Drug Policy Foundation', 'Lancet'],
  },
  {
    id: 'sol_mental_health',
    label: 'Mental Health\nInvestment',
    type: 'solution',
    description: 'Properly fund mental health services to match physical health. Reduce CAMHS wait times. Increase adult mental health beds. Integrate mental health into primary care and schools.',
    politicalDifficulty: 'easy',
    economicDifficulty: 'medium',
    practicality: 4,
    sideEffectRisk: 'low',
    riskDetail: 'Workforce shortage in psychiatric care; takes years to train specialists',
    sources: ['Mind', 'Royal College of Psychiatrists', 'NHS Long Term Plan'],
  },
  {
    id: 'sol_school_funding',
    label: 'Targeted School\nFunding',
    type: 'solution',
    description: 'Restore and increase funding for schools in deprived areas. Expand the Pupil Premium. Address SEND funding crisis. Close the 30% → 20% per-pupil gap that has eroded since 2013.',
    politicalDifficulty: 'easy',
    economicDifficulty: 'medium',
    practicality: 4,
    sideEffectRisk: 'low',
    riskDetail: 'Requires sustained fiscal commitment; money alone won\'t fix quality without good teachers',
    sources: ['IFS', 'Sutton Trust', 'Education Policy Institute'],
  },
  {
    id: 'sol_grid_upgrade',
    label: 'Grid\nModernisation',
    type: 'solution',
    description: 'Invest £13bn+ in grid infrastructure to enable renewable connections, support EVs and heat pumps, and build regional network capacity. Critical enabler for net zero.',
    politicalDifficulty: 'easy',
    economicDifficulty: 'hard',
    practicality: 3,
    sideEffectRisk: 'low',
    riskDetail: 'Long delivery timescales; planning challenges for pylons/cables; bill impact during transition',
    sources: ['National Grid', 'Ofgem', 'Climate Change Committee'],
  },
  {
    id: 'sol_prison_reform',
    label: 'Prison &\nJustice Reform',
    type: 'solution',
    description: 'Reduce prison overcrowding through community sentences, rehabilitation investment, and addressing root causes (addiction, mental health, poverty). Current system has 40%+ reoffending rate.',
    politicalDifficulty: 'hard',
    economicDifficulty: 'medium',
    practicality: 3,
    sideEffectRisk: 'medium',
    riskDetail: '"Soft on crime" narrative; public safety concerns; requires building new rehabilitation capacity',
    sources: ['Prison Reform Trust', 'JUSTICE', 'Institute for Government'],
  },

  // ════════════════════════════════════════════════
  //  GOVERNMENT POLICIES (Active & Proposed)
  // ════════════════════════════════════════════════
  {
    id: 'pol_planning_bill',
    label: 'Planning &\nInfrastructure Bill',
    type: 'policy',
    status: 'active',
    description: 'Landmark legislation to streamline planning approvals for housing and infrastructure. Aims to accelerate delivery of 1.5 million new homes in this parliament. Mandatory housing targets restored.',
    politicalDifficulty: 'hard',
    economicDifficulty: 'easy',
    practicality: 4,
    sideEffectRisk: 'medium',
    riskDetail: 'Strong NIMBY opposition, especially in Tory/Lib Dem-held areas; environmental concerns',
    sources: ['MHCLG', 'Labour Plan for Change'],
  },
  {
    id: 'pol_nhs_10yr',
    label: 'NHS 10-Year\nHealth Plan',
    type: 'policy',
    status: 'active',
    description: 'Three shifts: hospital→community care, analogue→digital, sickness→prevention. Abolishes NHS England. Halves performance targets. Reinvests agency staff savings into permanent roles.',
    politicalDifficulty: 'medium',
    economicDifficulty: 'medium',
    practicality: 3,
    sideEffectRisk: 'medium',
    riskDetail: 'Reorganisation disruption; uncertain savings from abolishing NHS England; digital transition costs',
    sources: ['DHSC', 'BMA', 'King\'s Fund', 'NHS Confederation'],
  },
  {
    id: 'pol_gb_energy',
    label: 'Great British\nEnergy',
    type: 'policy',
    status: 'active',
    description: 'New publicly-owned energy company to accelerate renewable deployment. Aims to leverage £100bn private investment in clean power. HQ in Aberdeen.',
    politicalDifficulty: 'medium',
    economicDifficulty: 'medium',
    practicality: 3,
    sideEffectRisk: 'low',
    riskDetail: 'Unproven model; risk of becoming a bureaucratic layer; political pressure to show quick results',
    sources: ['DESNZ', 'Labour Plan for Change'],
  },
  {
    id: 'pol_clean_power_2030',
    label: 'Clean Power\n2030 Mission',
    type: 'policy',
    status: 'active',
    description: 'Target to decarbonise the electricity grid by 2030. Includes offshore wind expansion, Sizewell C nuclear (£14.2bn), small modular reactors, and carbon capture investment.',
    politicalDifficulty: 'medium',
    economicDifficulty: 'hard',
    practicality: 3,
    sideEffectRisk: 'medium',
    riskDetail: 'Grid bottlenecks; supply chain constraints; risk of missing target if connections delayed',
    sources: ['CCC', 'House of Commons Library', 'DESNZ'],
  },
  {
    id: 'pol_immigration_wp',
    label: 'Immigration\nWhite Paper 2025',
    type: 'policy',
    status: 'proposed',
    description: 'Higher skill thresholds for visas (RQF Level 6+). Closes overseas care worker recruitment. 10-year route to settlement. Aims to manage net migration while addressing workforce needs.',
    politicalDifficulty: 'medium',
    economicDifficulty: 'medium',
    practicality: 3,
    sideEffectRisk: 'high',
    riskDetail: 'May worsen care worker shortages; businesses oppose skill threshold rises; 10-year settlement may deter talent',
    sources: ['Home Office', 'Migration Advisory Committee', 'Oxford Migration Observatory'],
  },
  {
    id: 'pol_crime_bill',
    label: 'Crime &\nPolicing Bill',
    type: 'policy',
    status: 'active',
    description: 'New powers to tackle antisocial behaviour, county lines, and knife crime. Respect Orders replacing ASBOs. Some concerns about civil liberties and expanding custodial powers.',
    politicalDifficulty: 'easy',
    economicDifficulty: 'easy',
    practicality: 3,
    sideEffectRisk: 'medium',
    riskDetail: 'Civil liberties concerns; expanding prison population without addressing root causes; enforcement capacity',
    sources: ['Home Office', 'JUSTICE', 'Liberty'],
  },
  {
    id: 'pol_devolution_deals',
    label: 'Devolution\nDeals Expansion',
    type: 'policy',
    status: 'active',
    description: 'Expanding combined authority model across England. Nearly 80% of population will be covered. New devolution framework giving more flexibility to local areas.',
    politicalDifficulty: 'medium',
    economicDifficulty: 'easy',
    practicality: 4,
    sideEffectRisk: 'low',
    riskDetail: 'Risk of patchy quality; some areas lack institutional capacity; powers often insufficient for real change',
    sources: ['DLUHC', 'Centre for Cities', 'LGA'],
  },
  {
    id: 'pol_national_wealth_fund',
    label: 'National\nWealth Fund',
    type: 'policy',
    status: 'active',
    description: 'Public investment vehicle to catalyse private investment in green industries, manufacturing, and regional growth. Targeting ports, steel, and automotive sectors.',
    politicalDifficulty: 'easy',
    economicDifficulty: 'medium',
    practicality: 3,
    sideEffectRisk: 'low',
    riskDetail: 'Risk of political interference in investment decisions; relatively small scale initially',
    sources: ['HM Treasury', 'Labour Plan for Change'],
  },
  {
    id: 'pol_skills_england',
    label: 'Skills England\n& Levy Reform',
    type: 'policy',
    status: 'proposed',
    description: 'New Skills England body to align training with employer needs. Proposed reform of the apprenticeship levy into a more flexible Growth and Skills Levy, allowing spending on shorter courses.',
    politicalDifficulty: 'easy',
    economicDifficulty: 'easy',
    practicality: 4,
    sideEffectRisk: 'low',
    riskDetail: 'Risk of diluting apprenticeship quality if levy becomes too flexible; employer gaming',
    sources: ['DfE', 'CBI', 'Association of Colleges'],
  },
  {
    id: 'pol_childcare_expansion',
    label: 'Childcare\nEntitlement Expansion',
    type: 'policy',
    status: 'active',
    description: 'Phased expansion of "free" childcare from 15 to 30 hours for all children from 9 months (full rollout September 2025). However, funded at £5.62-£5.88/hour while actual delivery cost is £8-10/hour, creating a structural deficit that providers must absorb or pass on.',
    politicalDifficulty: 'easy',
    economicDifficulty: 'hard',
    practicality: 2,
    sideEffectRisk: 'high',
    riskDetail: 'Underfunding forcing provider closures; quality decline; unfunded mandate risk; benefits skew to higher earners who can access places; worsens childcare desert problem',
    sources: ['IFS', 'Early Years Alliance', 'Coram Family & Childcare', 'NAO'],
  },
  {
    id: 'pol_online_safety_act',
    label: 'Online\nSafety Act',
    type: 'policy',
    status: 'active',
    description: 'Passed 2023, being implemented by Ofcom. Requires platforms to remove illegal content and protect children. Introduces age verification mandates, potential client-side scanning, and powers to compel backdoors in encrypted messaging.',
    politicalDifficulty: 'easy',
    economicDifficulty: 'medium',
    practicality: 2,
    sideEffectRisk: 'high',
    riskDetail: 'Undermines end-to-end encryption, pushes users to share ID with unregulated verification sites, compliance costs hit UK startups hardest, potential for mission creep in censorship',
    sources: ['Ofcom', 'Open Rights Group', 'Electronic Frontier Foundation', 'Big Brother Watch'],
  },
  {
    id: 'pol_vpn_ip_bill',
    label: 'VPN & IP\nRestrictions',
    type: 'policy',
    status: 'proposed',
    description: 'Proposed measures under Investigatory Powers (Amendment) Act 2024 and associated regulation to restrict VPN usage, mandate ISP-level filtering, and expand bulk surveillance powers. Part of broader Home Office "lawful access" agenda.',
    politicalDifficulty: 'medium',
    economicDifficulty: 'easy',
    practicality: 1,
    sideEffectRisk: 'high',
    riskDetail: 'Technically infeasible to fully enforce, damages UK cybersecurity industry, drives tech talent abroad, weakens infrastructure security for all users',
    sources: ['Investigatory Powers Commissioner', 'techUK', 'ISPA', 'Big Brother Watch'],
  },
  { id: 'pol_employer_ni_hike', label: 'Employer NI\nIncrease', type: 'policy', status: 'active', description: 'From April 2025, employer National Insurance rate rose from 13.8% to 15%, and the payment threshold dropped from £9,100 to £5,000 per employee. Oxford Economics estimates ~55,000 job cuts. The OBR projects 76% of the cost will be passed to workers through lower real wages. Disproportionately impacts labour-intensive sectors (hospitality, retail, social care) and SMEs. Employment Allowance increased to £10,500 to partially offset for small businesses.', politicalDifficulty: 'Hard', economicDifficulty: 'Hard', practicality: 3, sideEffectRisk: 'High', riskDetail: 'Job losses concentrated in low-wage sectors; risks accelerating social care provider collapse; may push businesses toward automation/offshoring', sources: ['OBR', 'Oxford Economics', 'GOV.UK'] },
  { id: 'pol_frozen_thresholds', label: 'Frozen Tax\nThresholds', type: 'policy', status: 'active', description: 'Income tax thresholds frozen at 2021-22 levels until at least 2028 (originally Conservative policy, continued by Labour). Personal allowance frozen at £12,570, higher rate at £50,270. Creates 780,000 new basic-rate and 920,000 new higher-rate taxpayers by 2029-30. Raises an estimated £25.5bn/year by end of freeze. Widely described as a "stealth tax" that avoids headline rate increases while substantially increasing the tax burden on working people.', politicalDifficulty: 'Easy', economicDifficulty: 'Easy', practicality: 5, sideEffectRisk: 'Medium', riskDetail: 'Erodes trust in "no tax rises for working people" pledges; regressive impact on middle earners; reduces consumer spending power', sources: ['House of Commons Library', 'IFS', 'OBR'] },

  // ════════════════════════════════════════════════
  //  FUTURE PROBLEMS (risks from current policies)
  // ════════════════════════════════════════════════
  {
    id: 'future_green_belt_loss',
    label: 'Green Belt\nErosion',
    type: 'future_problem',
    description: 'Loosened planning restrictions and fast-tracked development could lead to suburban sprawl, biodiversity loss, and destruction of green spaces around major cities. The Planning Bill removes some protections for "grey belt" land.',
    sources: ['CPRE', 'Wildlife Trusts', 'Town & Country Planning Association'],
  },
  {
    id: 'future_community_backlash',
    label: 'Community\nBacklash',
    type: 'future_problem',
    description: 'Fast-tracked developments that bypass local consultation risk fuelling anti-development NIMBYism and eroding trust in local democracy. Could become a significant electoral liability.',
    sources: ['Local Government Association', 'CPRE'],
  },
  {
    id: 'future_labour_shortages',
    label: 'Care & Agri\nLabour Shortage',
    type: 'future_problem',
    description: 'Restricting low-skilled migration via the Immigration White Paper could create severe shortages in care homes (120,000+ vacancies), agriculture (seasonal worker dependency), and hospitality. These sectors have limited domestic labour supply.',
    sources: ['Migration Advisory Committee', 'NFU', 'Care England'],
  },
  {
    id: 'future_nhs_recruitment_crisis',
    label: 'NHS Overseas\nRecruitment Crisis',
    type: 'future_problem',
    description: 'Tighter immigration rules threaten the pipeline of international doctors, nurses, and care workers. 30% of NHS doctors and 20% of nurses qualified overseas. The salary threshold increase could block recruitment.',
    sources: ['BMA', 'RCN', 'Health Foundation'],
  },
  {
    id: 'future_civil_liberties',
    label: 'Civil Liberties\nErosion',
    type: 'future_problem',
    description: 'The Crime & Policing Bill extends police powers including protest restrictions, facial recognition use, and knife crime orders. Critics warn it could suppress legitimate dissent and disproportionately affect minorities.',
    sources: ['Liberty', 'Joint Committee on Human Rights', 'Big Brother Watch'],
  },
  {
    id: 'future_encryption_weakening',
    label: 'Encryption\nWeakening',
    type: 'future_problem',
    description: 'OSA powers to compel backdoors in end-to-end encryption (Signal, WhatsApp) create systemic security vulnerabilities. Once a backdoor exists, it can be exploited by hostile states and criminals. Apple, Signal, and WhatsApp have threatened UK withdrawal.',
    sources: ['Signal Foundation', 'Information Commissioner', 'GCHQ (former directors)', 'Royal Society'],
  },
  {
    id: 'future_id_fraud_risk',
    label: 'ID Verification\nFraud Risk',
    type: 'future_problem',
    description: 'Age verification mandates train millions of users to submit passport/driving licence to unregulated third-party sites. Creates honeypot targets for identity theft. Australia\'s similar scheme saw immediate data breaches.',
    sources: ['Open Rights Group', 'Which?', 'National Cyber Security Centre'],
  },
  {
    id: 'future_uk_tech_exodus',
    label: 'UK Tech\nExodus',
    type: 'future_problem',
    description: 'Compliance costs of OSA disproportionately hit UK startups (£1-5M+ per company). Signal and Wikipedia threatened to leave UK. VPN restrictions undermine the £10bn UK cybersecurity sector. Tech talent migrating to jurisdictions with clearer digital rights.',
    sources: ['techUK', 'Coadec', 'Tech Nation', 'British Computer Society'],
    horizon: 'decade',
  },
  {
    id: 'future_censorship_creep',
    label: 'Censorship\nCreep',
    type: 'future_problem',
    description: 'Broad "legal but harmful" content powers (partially walked back but framework remains) enable future governments to expand takedown scope. Chilling effect on journalism, whistleblowing, and free expression already observed.',
    sources: ['Index on Censorship', 'Article 19', 'PEN International'],
    horizon: 'decade',
  },
  {
    id: 'future_surveillance_normalisation',
    label: 'Mass\nSurveillance',
    type: 'future_problem',
    description: 'Combined effect of facial recognition, bulk data collection, ISP monitoring, and encryption backdoors creates infrastructure for mass surveillance. Once built, very difficult to dismantle regardless of government.',
    sources: ['Big Brother Watch', 'Privacy International', 'Investigatory Powers Commissioner'],
    horizon: 'decade',
  },
  {
    id: 'future_transition_costs',
    label: 'Energy Transition\nCost Spike',
    type: 'future_problem',
    description: 'Rapid decarbonisation by 2030 requires massive upfront investment (£40-60bn). During transition, grid instability and intermittency risks could cause energy price spikes. Consumers may bear costs before benefits materialise.',
    sources: ['Climate Change Committee', 'Ofgem', 'National Grid ESO'],
  },
  {
    id: 'future_fossil_job_losses',
    label: 'Fossil Fuel\nJob Losses',
    type: 'future_problem',
    description: 'North Sea oil & gas supports ~200,000 UK jobs. Accelerated transition without adequate just transition funding risks devastating communities in Scotland, NE England, and Humberside that depend on the sector.',
    sources: ['OEUK', 'TUC', 'Platform (Scotland)'],
  },
  {
    id: 'future_digital_exclusion',
    label: 'Digital Exclusion\nin Healthcare',
    type: 'future_problem',
    description: 'NHS digitalisation push (app-first booking, remote consultations, AI triage) risks leaving behind 10 million digitally excluded adults — disproportionately elderly, disabled, and deprived communities.',
    sources: ['Good Things Foundation', 'Age UK', 'Healthwatch'],
  },
  {
    id: 'future_privatisation_creep',
    label: 'NHS Privatisation\nCreep',
    type: 'future_problem',
    description: 'Efficiency drives and expanded private sector partnerships in the 10-Year Plan could gradually erode the public model. Independent sector treatment centres already handle growing NHS waiting list volumes.',
    sources: ['We Own It', 'BMJ', 'Keep Our NHS Public'],
  },
  {
    id: 'future_misallocation',
    label: 'Investment\nMisallocation',
    type: 'future_problem',
    description: 'The National Wealth Fund risks government "picking losers" — directing billions to projects based on political rather than economic logic. Historical precedents (British Leyland, etc.) show mixed results for state-directed investment.',
    sources: ['IFS', 'Adam Smith Institute', 'Institute for Government'],
  },
  {
    id: 'future_postcode_lottery',
    label: 'Service\nPostcode Lottery',
    type: 'future_problem',
    description: 'Uneven devolution deals create inconsistent service quality. Some regions get mayoral powers and investment while others lack capacity. Without equalisation funding, devolution could widen regional gaps rather than close them.',
    sources: ['Institute for Government', 'Centre for Cities', 'LGA'],
  },
  { id: 'future_sme_collapse', label: 'SME Closures\n& Job Losses', type: 'future_problem', horizon: 'now', description: 'The combined impact of employer NI increases, frozen thresholds, and trade tariffs is creating a "cost squeeze" for SMEs. Oxford Economics projects ~55,000 direct job cuts from the NI hike alone. Labour-intensive sectors face the highest risk — hospitality, retail, and especially social care providers operating on thin margins. Some businesses are already restructuring, freezing recruitment, or cutting hours.', sources: ['Oxford Economics', 'FSB'] },
  { id: 'future_trade_war_escalation', label: 'Trade War\nEscalation', type: 'future_problem', horizon: 'decade', description: 'US tariffs are used as geopolitical leverage (e.g., Greenland dispute triggered 25% tariff threats). Without EU-scale negotiating power, the UK remains vulnerable to unilateral trade actions. Further escalation could target cars, alcohol, and digital services. UK GDP could fall 2.5% over 3 years under sustained friction. Risk of "economic coercion" becoming normalised in US-UK relations.', sources: ['Chatham House', 'LSE', 'House of Commons Library'] },
  { id: 'future_financial_hub_decline', label: 'London Financial\nHub Decline', type: 'future_problem', horizon: 'decade', description: 'London\'s financial centre faces structural decline as EU regulatory divergence deepens. The 2027 EU Capital Requirements Directive will further restrict non-EU banks. Continued loss of IPOs, listings, and talent to Paris, Frankfurt, Dublin. Tax revenue erosion from financial services threatens fiscal position. Risk of losing critical mass that sustains the ecosystem of legal, accounting, and fintech services.', sources: ['City of London Corp', 'CNBC', 'Economics Observatory'] },
  { id: 'future_care_staffing_crisis', label: 'Care Sector\nStaffing Crisis', type: 'future_problem', horizon: 'now', description: 'Immigration restrictions (higher salary thresholds, care visa limits) directly conflict with the care sector\'s 10%+ vacancy rate. With an aging population increasing demand by ~2% annually and domestic recruitment failing to fill gaps, the sector faces a perfect storm. Care provider closures are accelerating, pushing more burden onto the NHS and unpaid family carers. Disproportionately affects rural and deprived areas.', sources: ['Skills for Care', 'King\'s Fund', 'MAC'] },

  // ════════════════════════════════════════════════
  //  STRUCTURAL FUTURE THREATS (not policy-caused)
  // ════════════════════════════════════════════════

  // --- AI & Automation ---
  {
    id: 'future_ai_displacement',
    label: 'AI Job\nDisplacement',
    type: 'future_problem',
    horizon: 'decade',
    description: 'Generative AI and automation are projected to affect 10-30% of UK jobs within a decade. Routine cognitive work (admin, legal, finance, customer service) faces highest displacement risk. The ONS estimates ~1.5 million jobs at high risk of automation.',
    sources: ['ONS', 'Goldman Sachs (2023)', 'IPPR', 'World Economic Forum'],
  },
  {
    id: 'future_ai_inequality',
    label: 'AI-Driven\nInequality',
    type: 'future_problem',
    horizon: '30years',
    description: 'AI productivity gains may concentrate wealth among capital owners and highly-skilled workers, hollowing out the middle class. Without redistribution, the gap between AI-augmented and displaced workers could become a defining social divide.',
    sources: ['IMF', 'Brookings Institution', 'UK AI Safety Institute'],
  },
  {
    id: 'future_ai_governance',
    label: 'AI Governance\nGap',
    type: 'future_problem',
    horizon: '30years',
    description: 'Rapid AI capability growth outpaces regulatory frameworks. Risks include algorithmic bias in public services, deepfake-driven misinformation, autonomous weapons, and loss of meaningful human oversight in critical decisions.',
    sources: ['UK AI Safety Institute', 'Ada Lovelace Institute', 'House of Lords AI Committee'],
  },

  // --- Climate Extremes ---
  {
    id: 'future_weather_extremes',
    label: 'Extreme Weather\nEvents',
    type: 'future_problem',
    horizon: 'decade',
    description: 'UK already experiencing more frequent heatwaves, storms, and flooding. The 2023/24 winter was the wettest on record. Climate projections show 50% increase in extreme rainfall events by 2050 and summer temperatures regularly exceeding 40°C.',
    sources: ['Met Office', 'Climate Change Committee', 'Environment Agency'],
  },
  {
    id: 'future_water_scarcity',
    label: 'Water\nScarcity',
    type: 'future_problem',
    horizon: '30years',
    description: 'South East England faces a supply-demand gap of 4 billion litres/day by 2050. Ageing infrastructure loses 3 billion litres daily to leaks. Population growth and climate change together create severe drought risk.',
    sources: ['Environment Agency', 'National Infrastructure Commission', 'Water UK'],
  },
  {
    id: 'future_sea_level_rise',
    label: 'Coastal Flooding\n& Sea Rise',
    type: 'future_problem',
    horizon: '30years',
    description: 'UK sea levels projected to rise 0.3-1.0m by 2100. Over 500,000 properties in England at risk of coastal flooding. Cities like Hull, London (Thames Barrier limits), and Bristol face significant long-term inundation risk.',
    sources: ['Climate Change Committee', 'Environment Agency', 'IPCC AR6'],
  },
  {
    id: 'future_climate_migration',
    label: 'Climate\nMigration',
    type: 'future_problem',
    horizon: '30years',
    description: 'The World Bank projects 216 million internal climate migrants globally by 2050. As a temperate island, the UK will face increased asylum and migration pressure from climate-stressed regions in Africa, Middle East, and South Asia.',
    sources: ['World Bank', 'Institute for Strategic Studies', 'Internal Displacement Monitoring Centre'],
  },

  // --- Demographics ---
  {
    id: 'future_birthrate_decline',
    label: 'Declining\nBirth Rate',
    type: 'future_problem',
    horizon: 'now',
    description: 'UK fertility rate fell to 1.49 in 2023 — well below the 2.1 replacement level and the lowest ever recorded. Driven by housing costs, childcare costs, economic insecurity, and changing social norms. Without immigration, population would begin declining by mid-2030s.',
    sources: ['ONS', 'Resolution Foundation', 'Nuffield Foundation'],
  },
  {
    id: 'future_aging_population',
    label: 'Ageing\nPopulation',
    type: 'future_problem',
    horizon: 'decade',
    description: 'Over-65s will rise from 19% to 26% of the UK population by 2050. The old-age dependency ratio (workers per retiree) will shift from 3.5:1 to below 2.5:1, straining pensions, healthcare, and social care systems beyond current capacity.',
    sources: ['ONS Population Projections', 'OBR Fiscal Risks Report', 'Age UK'],
  },
  {
    id: 'future_workforce_shortage',
    label: 'Structural\nWorkforce Shortage',
    type: 'future_problem',
    horizon: '30years',
    description: 'Combination of declining birth rates, aging population, and immigration restrictions could shrink the working-age population by 2-4 million by 2060. This threatens economic output, tax revenues, and the viability of public services.',
    sources: ['OBR', 'Migration Advisory Committee', 'Resolution Foundation'],
  },
  {
    id: 'future_pension_crisis',
    label: 'Pension\nCrisis',
    type: 'future_problem',
    horizon: '30years',
    description: 'State pension costs projected to rise from 5% to 8%+ of GDP by 2070. The OBR warns of a £100bn+ fiscal gap from aging. Auto-enrolment pension pots are often too small for adequate retirement income. State pension age likely to rise to 68-70.',
    sources: ['OBR Fiscal Sustainability Report', 'Pensions Policy Institute', 'IFS'],
  },
  {
    id: 'future_childcare_collapse',
    label: 'Childcare\nProvider Collapse',
    type: 'future_problem',
    horizon: 'decade',
    description: 'The gap between government funding rates (£5.62/hour) and actual delivery costs (£8-10/hour) is unsustainable. 5,000+ providers closed 2019-2024 and closures accelerating. If the 2025 expansion proceeds underfunded, modelling suggests 10-20% of remaining providers could close, creating irreversible childcare deserts particularly in deprived areas.',
    sources: ['Early Years Alliance', 'IFS', 'NAO', 'Sutton Trust'],
  },
  {
    id: 'future_gender_inequality_entrenchment',
    label: 'Gender\nInequality Lock-in',
    type: 'future_problem',
    horizon: 'decade',
    description: 'Without structural childcare reform, the motherhood penalty becomes self-reinforcing: women exit workforce → lose skills/networks → lower lifetime earnings → lower pension → elder poverty. The UK gender pension gap is already 35%. Each generation of mothers displaced from careers worsens the cycle.',
    sources: ['Fawcett Society', 'IFS', 'Women\'s Budget Group', 'EHRC'],
  },

  // --- Health ---
  {
    id: 'future_antibiotic_resistance',
    label: 'Antibiotic\nResistance',
    type: 'future_problem',
    horizon: 'decade',
    description: 'Drug-resistant infections already cause ~5,000 UK deaths/year and rising. Without new antibiotics, routine surgery and cancer treatment become high-risk. The O\'Neill Review estimated 10 million global deaths/year by 2050.',
    sources: ['O\'Neill Review', 'UK Health Security Agency', 'WHO'],
  },

  // --- Social ---
  {
    id: 'future_social_fragmentation',
    label: 'Social\nFragmentation',
    type: 'future_problem',
    horizon: 'decade',
    description: 'Declining trust in institutions, social media echo chambers, culture wars, and rising loneliness are eroding social cohesion. 45% of UK adults report feeling lonely sometimes or often. Risk of political radicalisation and community breakdown.',
    sources: ['DCMS Community Life Survey', 'Jo Cox Foundation', 'Policy Exchange'],
  },
  {
    id: 'future_disinformation',
    label: 'AI-Powered\nDisinformation',
    type: 'future_problem',
    horizon: 'decade',
    description: 'Deepfakes, synthetic media, and AI-generated disinformation threaten democratic processes and public trust. The UK has already seen AI-generated content in elections. Scale and sophistication growing exponentially.',
    sources: ['Alan Turing Institute', 'Full Fact', 'Ofcom'],
  },

  // Democracy & representation solutions
  {
    id: 'sol_proportional_representation',
    label: 'Proportional\nRepresentation',
    type: 'solution',
    description: 'Replace FPTP with a proportional system (e.g. STV, MMP). Countries with PR have higher turnout (avg +7%), more diverse parliaments, and policy closer to median voter preferences. Supported by 45% of UK public.',
    politicalDifficulty: 'hard',
    economicDifficulty: 'easy',
    practicality: 4,
    sideEffectRisk: 'medium',
    riskDetail: 'Coalition instability, loss of constituency link, major parties would lose guaranteed majorities',
    sources: ['Electoral Reform Society', 'Make Votes Matter', 'IPPR'],
  },
  {
    id: 'sol_lobbying_reform',
    label: 'Lobbying\nTransparency',
    type: 'solution',
    description: 'Mandatory lobbying register covering all professional lobbying (not just consultant lobbyists). Real-time disclosure of meetings, revolving door cooling-off periods, caps on political donations.',
    politicalDifficulty: 'hard',
    economicDifficulty: 'easy',
    practicality: 4,
    sideEffectRisk: 'low',
    riskDetail: 'Resistance from incumbents, enforcement challenges',
    sources: ['Transparency International UK', 'Committee on Standards in Public Life'],
  },
  {
    id: 'sol_civic_education',
    label: 'Civic\nEducation',
    type: 'solution',
    description: 'Mandatory, high-quality citizenship education in schools covering democratic participation, media literacy, and civic rights. Currently underresourced — only 2% of curriculum time. Proven to increase youth engagement.',
    politicalDifficulty: 'easy',
    economicDifficulty: 'easy',
    practicality: 4,
    sideEffectRisk: 'low',
    riskDetail: 'Risk of politicisation in curriculum design',
    sources: ['Hansard Society', 'Education Policy Institute', 'APPG on Political Literacy'],
  },
  {
    id: 'sol_votes_at_16',
    label: 'Votes at 16',
    type: 'solution',
    description: 'Lower voting age to 16 as already done in Scotland and Wales. Evidence from Scotland\'s independence referendum showed 75% turnout among 16-17 year olds. Habit-forming — early voters vote for life.',
    politicalDifficulty: 'medium',
    economicDifficulty: 'easy',
    practicality: 5,
    sideEffectRisk: 'low',
    riskDetail: 'Concerns about maturity, but already trusted to work, pay tax, join army',
    sources: ['Electoral Commission Scotland', 'British Youth Council', 'IPPR'],
  },
  {
    id: 'sol_media_plurality',
    label: 'Media\nPlurality',
    type: 'solution',
    description: 'Ownership caps to prevent concentration. Public interest test for media mergers. Fund local journalism via levy on digital platforms. Strengthen Ofcom powers over ownership diversity.',
    politicalDifficulty: 'hard',
    economicDifficulty: 'medium',
    practicality: 3,
    sideEffectRisk: 'medium',
    riskDetail: 'Press freedom concerns, powerful media opposition',
    sources: ['Media Reform Coalition', 'Cairncross Review', 'Reuters Institute'],
  },

  // Digital rights & privacy solutions
  {
    id: 'sol_encryption_protection',
    label: 'Protect\nEncryption',
    type: 'solution',
    description: 'Legislate to protect end-to-end encryption from government backdoor mandates. Align with expert consensus that backdoors create systemic vulnerabilities. EU and US courts increasingly protecting encryption rights.',
    politicalDifficulty: 'hard',
    economicDifficulty: 'easy',
    practicality: 5,
    sideEffectRisk: 'low',
    riskDetail: 'Law enforcement loses one surveillance avenue, but encryption is already easily available globally',
    sources: ['Signal Foundation', 'Royal Society', 'GCHQ (technical assessment)', 'EFF'],
  },
  {
    id: 'sol_digital_rights_bill',
    label: 'Digital Rights\nBill',
    type: 'solution',
    description: 'Comprehensive digital rights framework: data minimisation, right to anonymity online, prohibition on mass surveillance, privacy-preserving age assurance (not ID upload), independent oversight of algorithmic systems.',
    politicalDifficulty: 'hard',
    economicDifficulty: 'easy',
    practicality: 4,
    sideEffectRisk: 'low',
    riskDetail: 'Some tension with law enforcement objectives; requires international coordination',
    sources: ['Open Rights Group', 'Ada Lovelace Institute', 'Privacy International'],
  },
  {
    id: 'sol_osa_reform',
    label: 'OSA Reform',
    type: 'solution',
    description: 'Amend the Online Safety Act to remove encryption backdoor provisions, replace ID-based age verification with privacy-preserving alternatives, narrow scope to genuinely illegal content, and add startup exemptions for compliance costs.',
    politicalDifficulty: 'medium',
    economicDifficulty: 'easy',
    practicality: 4,
    sideEffectRisk: 'low',
    riskDetail: 'Child safety campaigners may oppose; requires nuanced public communication',
    sources: ['techUK', 'Open Rights Group', 'Carnegie UK'],
  },
  { id: 'sol_threshold_indexation', label: 'Index Tax\nThresholds', type: 'solution', description: 'Restore automatic inflation-indexation of income tax thresholds to end fiscal drag. Would cost Treasury ~£25bn/year but restore ~£1,300/year to average taxpayer. Could be phased in over 2-3 years to manage fiscal impact. Addresses the regressive nature of frozen thresholds and restores trust in "no stealth taxes" commitment.', politicalDifficulty: 'Hard', economicDifficulty: 'Hard', practicality: 4, sideEffectRisk: 'Low', riskDetail: 'Large fiscal cost requires offsetting spending cuts or other revenue sources', sources: ['IFS', 'Resolution Foundation'] },
  { id: 'sol_trade_diversification', label: 'Trade\nDiversification', type: 'solution', description: 'Accelerate trade agreements with non-US partners (CPTPP implementation, India, Gulf states) to reduce vulnerability to US tariff threats. Strengthen UK-EU trade relationship via regulatory alignment on goods. Develop export support programs for SMEs to access new markets. Post-Brexit, UK has flexibility to pursue independent trade policy but lacks the leverage of a larger trading bloc.', politicalDifficulty: 'Medium', economicDifficulty: 'Medium', practicality: 3, sideEffectRisk: 'Low', riskDetail: 'New trade deals take years to negotiate and may require regulatory compromises', sources: ['Trade Policy Observatory', 'House of Commons Library'] },
  { id: 'sol_eu_financial_alignment', label: 'EU Financial\nAlignment', type: 'solution', description: 'Negotiate mutual recognition of financial regulations with the EU to restore some passporting-like access for UK financial firms. Would stem the flow of jobs, listings, and assets to EU centres. Requires balancing sovereignty concerns with pragmatic market access needs. The EU has limited incentive to agree unless UK aligns on key standards.', politicalDifficulty: 'Hard', economicDifficulty: 'Easy', practicality: 2, sideEffectRisk: 'Medium', riskDetail: 'Politically toxic for both parties — seen as "rejoining by stealth" by Brexiteers, insufficient by Remainers', sources: ['UK in a Changing Europe', 'City of London Corp'] },
  { id: 'sol_ni_relief', label: 'Employer NI\nTargeted Relief', type: 'solution', description: 'Provide targeted employer NI relief for vulnerable sectors (social care, hospitality) and for businesses hiring young workers or apprentices. Could include graduated thresholds, sector-specific exemptions, or enhanced Employment Allowance for labour-intensive industries. Reduces the blunt impact of the flat-rate increase while maintaining revenue from sectors that can absorb it.', politicalDifficulty: 'Medium', economicDifficulty: 'Medium', practicality: 4, sideEffectRisk: 'Low', riskDetail: 'Creates complexity in tax system; risk of lobbying for exemptions expanding beyond intended scope', sources: ['OBR', 'FSB', 'CIPD'] },

  // ════════════════════════════════════════════════
  //  SOLUTIONS FOR FUTURE PROBLEMS
  // ════════════════════════════════════════════════
  {
    id: 'sol_ai_regulation',
    label: 'AI Regulation\n& Safety',
    type: 'solution',
    horizon: 'decade',
    description: 'Comprehensive AI regulation including mandatory safety testing, algorithmic impact assessments, sector-specific rules, and international coordination. The UK AI Safety Institute provides a foundation but binding legislation is needed.',
    politicalDifficulty: 'medium',
    economicDifficulty: 'medium',
    practicality: 3,
    sideEffectRisk: 'medium',
    riskDetail: 'Over-regulation could drive AI companies abroad; under-regulation leaves risks unmanaged',
    sources: ['UK AI Safety Institute', 'EU AI Act', 'Ada Lovelace Institute'],
  },
  {
    id: 'sol_ai_transition',
    label: 'AI Transition\nSupport',
    type: 'solution',
    horizon: 'decade',
    description: 'Massive retraining programmes, portable benefits, income support during transition, and new models of work for displaced workers. Could include conditional basic income, mid-career education grants, and employer transition levies.',
    politicalDifficulty: 'hard',
    economicDifficulty: 'hard',
    practicality: 2,
    sideEffectRisk: 'medium',
    riskDetail: 'Fiscal cost is enormous; risk of creating dependency if poorly designed',
    sources: ['IPPR', 'RSA', 'McKinsey Global Institute'],
  },
  {
    id: 'sol_flood_defences',
    label: 'Flood Defence\nInvestment',
    type: 'solution',
    horizon: 'decade',
    description: 'Scaled-up flood defences, managed retreat from highest-risk areas, natural flood management (rewilding, wetlands), and updated building standards. Current spending of £5.2bn over 6 years is widely considered insufficient.',
    politicalDifficulty: 'easy',
    economicDifficulty: 'hard',
    practicality: 4,
    sideEffectRisk: 'low',
    riskDetail: 'Managed retreat is politically toxic; some communities may resist relocation',
    sources: ['Environment Agency', 'Committee on Climate Change', 'National Trust'],
  },
  {
    id: 'sol_pronatalist',
    label: 'Family Support\nPolicies',
    type: 'solution',
    horizon: 'decade',
    description: 'Subsidised childcare, extended parental leave, housing support for families, child benefit increases, and flexible working rights. Nordic-style family policies have shown modest fertility rate improvements of 0.1-0.3.',
    politicalDifficulty: 'medium',
    economicDifficulty: 'hard',
    practicality: 3,
    sideEffectRisk: 'low',
    riskDetail: 'Effect on birth rates is modest; expensive with long lag before economic returns',
    sources: ['Nuffield Foundation', 'OECD Family Database', 'Resolution Foundation'],
  },
  {
    id: 'sol_managed_migration',
    label: 'Managed Skills\nMigration',
    type: 'solution',
    horizon: 'decade',
    description: 'Points-based immigration calibrated to demographic and skills needs, with integration support. Contrast to blunt caps — a data-driven approach matching worker shortages in health, care, tech, and agriculture.',
    politicalDifficulty: 'hard',
    economicDifficulty: 'easy',
    practicality: 4,
    sideEffectRisk: 'medium',
    riskDetail: 'Politically explosive; risk of brain drain from source countries',
    sources: ['Migration Advisory Committee', 'IPPR', 'Migration Observatory'],
  },
  {
    id: 'sol_water_infrastructure',
    label: 'Water\nInfrastructure',
    type: 'solution',
    horizon: '30years',
    description: 'Fix leaking pipes (losing 3bn litres/day), build new reservoirs (none built since 1991), water recycling, desalination, and demand management. Requires £50bn+ investment and potentially re-nationalising water companies.',
    politicalDifficulty: 'medium',
    economicDifficulty: 'hard',
    practicality: 4,
    sideEffectRisk: 'low',
    riskDetail: 'Re-nationalisation costs enormous; reservoir construction faces planning battles',
    sources: ['National Infrastructure Commission', 'Ofwat', 'Water UK'],
  },
  {
    id: 'sol_coastal_adaptation',
    label: 'Coastal\nAdaptation',
    type: 'solution',
    horizon: '30years',
    description: 'Long-term coastal adaptation strategy including Thames Barrier 2 (current barrier protection expires ~2070), managed realignment, updated flood mapping, and restriction of development in flood-risk zones.',
    politicalDifficulty: 'hard',
    economicDifficulty: 'hard',
    practicality: 3,
    sideEffectRisk: 'medium',
    riskDetail: 'Property devaluation in at-risk areas; political cost of admitting some areas cannot be saved',
    sources: ['Environment Agency', 'Thames Estuary 2100', 'Climate Change Committee'],
  },
  {
    id: 'sol_media_literacy',
    label: 'Media Literacy\n& Platform Rules',
    type: 'solution',
    horizon: 'decade',
    description: 'Mandatory media literacy in schools, platform accountability for AI-generated content, deepfake labelling requirements, and funding for fact-checking infrastructure. Online Safety Act provides some foundation.',
    politicalDifficulty: 'medium',
    economicDifficulty: 'easy',
    practicality: 3,
    sideEffectRisk: 'medium',
    riskDetail: 'Risk of censorship if platform rules are too broad; hard to enforce internationally',
    sources: ['Ofcom', 'Full Fact', 'Alan Turing Institute'],
  },

  // ════════════════════════════════════════════════
  //  ADDITIONAL CLUSTERS: UNDEREXPLORED ISSUES
  // ════════════════════════════════════════════════

  // --- Loneliness Epidemic ---
  { id: 'loneliness_epidemic', label: 'Loneliness\nEpidemic', type: 'cause', description: '1 in 4 UK adults chronically lonely, health impact comparable to 15 cigarettes/day. £32bn annual cost. Post-COVID worsening, aging population, remote work isolation.', sources: ['Jo Cox Commission on Loneliness', 'Campaign to End Loneliness', 'ONS'] },
  { id: 'sol_social_infrastructure', label: 'Social\nInfrastructure', type: 'solution', description: 'Invest in community centres, libraries, public spaces, third places. Evidence shows physical meeting spaces reduce isolation more than digital interventions.', politicalDifficulty: 'medium', economicDifficulty: 'medium', practicality: 4, sideEffectRisk: 'low', riskDetail: 'Requires sustained funding commitment; risk of underuse without community engagement', sources: ['Bennett Institute for Public Policy', 'British Red Cross'] },
  { id: 'sol_social_prescribing', label: 'Social\nPrescribing', type: 'solution', description: 'Expand GP-linked social prescribing (referring lonely patients to community activities). 900k+ referrals/year but patchy coverage. Needs ring-fenced funding and evaluation.', politicalDifficulty: 'easy', economicDifficulty: 'easy', practicality: 4, sideEffectRisk: 'low', riskDetail: 'Effectiveness evidence still emerging; risk of medicalising social problems', sources: ['NHS England', 'National Academy for Social Prescribing'] },

  // --- Water Privatisation Failure ---
  { id: 'water_privatisation', label: 'Water\nPrivatisation\nFailure', type: 'cause', description: '£85bn extracted in dividends since 1989, £70bn debt loaded onto companies, 40%+ real-terms bill increases. Sewage spills at record levels. Infrastructure crumbling. Scottish Water (public) delivers lower bills and higher investment.', sources: ['University of Greenwich', 'Ofwat', 'Environment Agency'] },
  { id: 'sol_water_renationalisation', label: 'Water\nRenationalisation', type: 'solution', description: 'Return water companies to public ownership. Scottish Water model shows public ownership delivers lower bills, higher investment, and better environmental outcomes. Costs estimated £15-90bn depending on model.', politicalDifficulty: 'hard', economicDifficulty: 'hard', practicality: 3, sideEffectRisk: 'medium', riskDetail: 'Enormous upfront cost; legal challenges from shareholders; transition disruption', sources: ['We Own It', 'University of Greenwich', 'Social Market Foundation'] },
  { id: 'pol_water_special_measures', label: 'Water Special\nMeasures Act', type: 'policy', status: 'active', description: 'Regulates executive pay/bonuses, increases Ofwat powers. Critics say it doesn\'t go far enough without structural ownership change.', sources: ['UK Parliament', 'Ofwat'] },
  { id: 'future_water_infrastructure_collapse', label: 'Water Infrastructure\nCollapse', type: 'future_problem', horizon: 'decade', description: 'Without massive investment, Victorian-era water/sewage infrastructure faces systemic failure. Combined sewer overflows already at crisis levels.', sources: ['National Infrastructure Commission', 'Water UK'] },

  // --- Gig Economy / Insecure Work ---
  { id: 'gig_economy', label: 'Gig Economy &\nInsecure Work', type: 'cause', description: '4.4m+ workers in insecure employment. Zero-hours contracts, bogus self-employment, no sick pay/pensions/holiday. Drives in-work poverty and prevents savings.', sources: ['TUC', 'Resolution Foundation', 'ONS'] },
  { id: 'sol_employment_rights', label: 'Employment\nRights Reform', type: 'solution', description: 'Ban exploitative zero-hours contracts, extend employment rights to gig workers (sick pay, holiday, pension contributions). Strengthen enforcement via single enforcement body.', politicalDifficulty: 'medium', economicDifficulty: 'medium', practicality: 4, sideEffectRisk: 'medium', riskDetail: 'Business cost increases; may reduce labour market flexibility; enforcement challenges', sources: ['TUC', 'CIPD', 'Low Pay Commission'] },

  // --- Intergenerational Wealth Gap ---
  { id: 'intergenerational_gap', label: 'Intergenerational\nWealth Gap', type: 'cause', description: 'Millennials have 50% less wealth than boomers at same age. Property ownership, pension access, student debt, and wage stagnation all compound. Inheritance increasingly determines life outcomes.', sources: ['Resolution Foundation', 'IFS', 'ONS Wealth and Assets Survey'] },
  { id: 'future_generational_conflict', label: 'Generational\nConflict', type: 'future_problem', horizon: 'decade', description: 'Growing political and economic tension between asset-rich older generations and asset-poor younger ones. Risk of policy paralysis as demographics favour older voters.', sources: ['Resolution Foundation', 'Intergenerational Foundation'] },

  // --- Institutional Trust Collapse ---
  { id: 'institutional_trust_collapse', label: 'Institutional\nTrust Collapse', type: 'cause', description: 'Trust in Parliament at historic lows (~12%). Police trust dropped post-Sarah Everard. Media trust among lowest in Europe. Scientific trust challenged post-COVID. Erodes social contract and democratic legitimacy.', sources: ['Edelman Trust Barometer', 'Hansard Society', 'Reuters Institute'] },

  // --- Soil Degradation & Food Security ---
  { id: 'soil_degradation', label: 'Soil Degradation', type: 'cause', description: 'UK has lost 84% of fertile topsoil since 1850. Intensive agriculture depletes soil at 100x natural replenishment rate. 30-40 harvests left at current rates in some areas. Threatens long-term food security.', sources: ['Sustainable Soils Alliance', 'Environment Agency', 'Cranfield University'] },
  { id: 'food_insecurity', label: 'Food\nInsecurity', type: 'cause', description: '8.4m UK adults experienced food insecurity in 2024. 3m+ food bank parcels distributed. Post-Brexit import friction. 46% of food imported, with supply chains vulnerable to climate and geopolitics.', sources: ['Food Foundation', 'Trussell Trust', 'DEFRA'] },
  { id: 'sol_food_sovereignty', label: 'Food\nSovereignty', type: 'solution', description: 'Increase UK self-sufficiency in food production through support for sustainable farming, local food networks, urban agriculture, and reducing food waste (9.5m tonnes/year). Reduce import dependency.', politicalDifficulty: 'medium', economicDifficulty: 'medium', practicality: 3, sideEffectRisk: 'low', riskDetail: 'Higher domestic food prices possible; land use competition with housing and energy', sources: ['Food Foundation', 'Sustain', 'DEFRA'] },
  { id: 'sol_regenerative_agriculture', label: 'Regenerative\nAgriculture', type: 'solution', description: 'Shift subsidies from intensive to regenerative farming practices that restore soil health, sequester carbon, and support biodiversity. ELMS (Environmental Land Management) is a start but underfunded.', politicalDifficulty: 'medium', economicDifficulty: 'medium', practicality: 3, sideEffectRisk: 'low', riskDetail: 'Transition period reduces yields; farmer resistance to practice changes; insufficient support during changeover', sources: ['Soil Association', 'DEFRA', 'Rothamsted Research'] },

  // --- Land Value Tax ---
  { id: 'sol_land_value_tax', label: 'Land Value\nTax', type: 'solution', description: 'Replace council tax and business rates with a tax on unimproved land value. Discourages speculation and land banking, incentivises development, progressive (landowners pay), generates ~£45bn. Supported by economists across the spectrum.', politicalDifficulty: 'hard', economicDifficulty: 'medium', practicality: 3, sideEffectRisk: 'medium', riskDetail: 'Massive opposition from landowners; transitional disruption to property markets; requires comprehensive land value assessment', sources: ['IFS', 'Adam Smith Institute', 'RICS'] },

  // --- Universal Basic Income ---
  { id: 'sol_ubi', label: 'Universal\nBasic Income', type: 'solution', description: 'Unconditional regular payments to all citizens. Pilots (Finland, Wales) show improved wellbeing, no reduction in work effort. Would simplify welfare, address automation displacement, reduce in-work poverty. Cost ~£200-300bn but replaces much existing welfare.', politicalDifficulty: 'hard', economicDifficulty: 'hard', practicality: 2, sideEffectRisk: 'medium', riskDetail: 'Enormous fiscal cost; work incentive concerns (though pilots suggest otherwise); complex transition from existing benefits', sources: ['RSA', 'Basic Income Earth Network', 'Welsh Government UBI Pilot'] },

  // --- Four-Day Work Week ---
  { id: 'sol_four_day_week', label: 'Four-Day\nWork Week', type: 'solution', description: 'UK trials (61 companies, 2022-23): 92% continued, revenue up 35%, sick days down 65%, staff turnover down 57%. Full pay for 80% of hours with 100% productivity target. Reduces childcare costs by 20%, improves mental health.', politicalDifficulty: 'medium', economicDifficulty: 'medium', practicality: 3, sideEffectRisk: 'low', riskDetail: 'Not suitable for all sectors (healthcare, emergency services); competitive concerns if adopted unilaterally', sources: ['4 Day Week Campaign', 'Autonomy', 'Cambridge University'] },

  // --- Citizens' Assemblies ---
  { id: 'sol_citizens_assemblies', label: 'Citizens\'\nAssemblies', type: 'solution', description: 'Randomly selected citizens deliberating on complex policy issues (climate, constitution). Used successfully in Ireland (abortion, marriage equality), France. Rebuilds trust, creates informed and legitimate policy mandates. Can be permanent or issue-specific.', politicalDifficulty: 'medium', economicDifficulty: 'easy', practicality: 4, sideEffectRisk: 'low', riskDetail: 'Politicians may resist sharing decision-making power; media may trivialise; requires genuine government commitment to implement recommendations', sources: ['Sortition Foundation', 'RSA', 'OECD'] },

  // --- Community Wealth Building ---
  { id: 'sol_community_wealth', label: 'Community\nWealth Building', type: 'solution', description: 'Preston Model: redirect council procurement to local businesses, support co-operatives, anchor institutions invest locally, community land trusts. Preston reduced unemployment by 60%. Keeps wealth circulating locally rather than extracted by distant shareholders.', politicalDifficulty: 'easy', economicDifficulty: 'easy', practicality: 5, sideEffectRisk: 'low', riskDetail: 'May face resistance from large corporations losing procurement contracts; requires local government capacity', sources: ['Centre for Local Economic Strategies', 'Preston City Council', 'Democracy Collaborative'] },

  // --- Obesity & Ultra-Processed Food ---
  { id: 'obesity_upf_crisis', label: 'Obesity & UPF\nCrisis', type: 'cause', description: '64% of UK adults overweight/obese. Ultra-processed foods cause 17,000+ premature deaths/year and account for 57% of caloric intake. Healthy food costs 2x unhealthy per calorie. Poorest households would need 45% of income for healthy diet.', sources: ['BMJ', 'Food Foundation', 'NHS Digital'] },
  { id: 'sol_upf_regulation', label: 'UPF Regulation\n& Food Reform', type: 'solution', description: 'Sugar/salt taxes, junk food ad bans (especially to children), mandatory reformulation targets, free school meals expansion, food environment regulation (limit fast food density near schools).', politicalDifficulty: 'hard', economicDifficulty: 'medium', practicality: 3, sideEffectRisk: 'medium', riskDetail: 'Massive food industry lobbying; "nanny state" accusations; regressive impact of food taxes without compensating measures', sources: ['Public Health England', 'Jamie Oliver Food Foundation', 'BMJ'] },

  // --- Gambling Harm ---
  { id: 'gambling_harm', label: 'Gambling\nHarm', type: 'cause', description: '1.3m problem gamblers in UK, 3.8m at risk. £14bn/year industry. Online gambling normalised especially among young men. Linked to 400-700 suicides/year. Gambling companies spend £1.5bn/year on advertising.', sources: ['Gambling Commission', 'NHS', 'Gambling with Lives'] },
  { id: 'sol_gambling_reform', label: 'Gambling\nRegulation Reform', type: 'solution', description: 'Mandatory stake limits, ad ban (especially during sport), affordability checks, levy on gambling companies to fund treatment. White Paper 2023 was weak — stronger action needed.', politicalDifficulty: 'medium', economicDifficulty: 'easy', practicality: 4, sideEffectRisk: 'low', riskDetail: 'Gambling industry lobbying; concerns about driving activity offshore; impact on horse racing and sports sponsorship', sources: ['Gambling Commission', 'Gambling with Lives', 'House of Lords Select Committee'] },

  // --- Air Pollution ---
  { id: 'air_pollution', label: 'Air Pollution', type: 'cause', description: 'Causes 28,000-36,000 premature UK deaths/year. Costs NHS £1.6bn/year. Disproportionately affects deprived areas. Road transport, domestic heating, and agriculture main sources. Legal limits regularly breached.', sources: ['DEFRA', 'Royal College of Physicians', 'Client Earth'] },
  { id: 'sol_clean_air', label: 'Clean Air\nAct 2.0', type: 'solution', description: 'WHO-aligned air quality targets (legally binding), expansion of Clean Air Zones, investment in public transport and active travel, phase-out of wood-burning stoves in urban areas.', politicalDifficulty: 'medium', economicDifficulty: 'medium', practicality: 4, sideEffectRisk: 'low', riskDetail: 'Motorist backlash similar to ULEZ; rural areas dependent on solid fuel heating; enforcement challenges', sources: ['Client Earth', 'British Lung Foundation', 'DEFRA'] },

  // --- Biodiversity Loss ---
  { id: 'biodiversity_loss', label: 'Biodiversity\nLoss', type: 'cause', description: 'UK is one of the most nature-depleted countries on Earth (bottom 10%). 41% of species declining. Pollinator populations crashed. Agricultural intensification, habitat loss, pesticide use. Threatens food security via reduced pollination (£690m/year value).', sources: ['Natural History Museum', 'State of Nature Report', 'RSPB'] },
  { id: 'sol_nature_restoration', label: 'Nature\nRestoration', type: 'solution', description: 'Legally binding targets to halt species decline, 30% of land/sea protected by 2030, ban neonicotinoids, restore peatlands and wetlands, rewilding initiatives. Fund via biodiversity credits and reformed agricultural subsidies.', politicalDifficulty: 'medium', economicDifficulty: 'medium', practicality: 3, sideEffectRisk: 'low', riskDetail: 'Farmer resistance to land use changes; tension with housing development targets; rewilding controversial in rural communities', sources: ['Wildlife Trusts', 'Natural England', 'Rewilding Britain'] },

  // --- Local Government Funding Crisis ---
  { id: 'local_govt_crisis', label: 'Local Government\nFunding Crisis', type: 'cause', description: '£4bn+ annual funding gap. Half of upper-tier councils risk insolvency. Birmingham (£148m cuts), Cornwall (£48.7m). 60% real-terms funding cut since 2010. Statutory services being slashed. Libraries, youth centres, parks closing.', sources: ['LGA', 'NAO', 'Institute for Fiscal Studies'] },
  { id: 'future_council_collapse', label: 'Mass Council\nInsolvency', type: 'future_problem', horizon: 'now', description: 'Multiple councils already issued Section 114 notices (effective bankruptcy). More expected as SEND debts crystallise and temporary measures expire. Risk of fundamental breakdown in local public services.', sources: ['LGA', 'CIPFA', 'The Bureau of Investigative Journalism'] },
  { id: 'sol_local_funding_reform', label: 'Local Government\nFunding Reform', type: 'solution', description: 'Multi-year funding settlements, fair funding formula, allow councils to raise revenue locally (tourism taxes, land value capture), write off historical SEND debt, end competitive bidding for pots.', politicalDifficulty: 'medium', economicDifficulty: 'hard', practicality: 4, sideEffectRisk: 'low', riskDetail: 'Winners and losers in any redistribution; fiscal hawks oppose more local spending power', sources: ['LGA', 'IFS', 'New Local'] },

  // --- SEND Crisis ---
  { id: 'send_crisis', label: 'SEND Crisis', type: 'cause', description: '£5bn cumulative deficit. Only 50% of Education, Health and Care plans completed on time. Demand massively outstripping provision. Parents going through tribunals (97% success rate = system failing). Statutory override expires March 2026, threatening mass council insolvency.', sources: ['NAO', 'LGA', 'IPSEA'] },
  { id: 'sol_send_reform', label: 'SEND System\nReform', type: 'solution', description: 'Properly fund mainstream inclusion, reduce EHC plan bureaucracy, national standards with local flexibility, early identification and support, write off council SEND debts, adequately fund special schools.', politicalDifficulty: 'medium', economicDifficulty: 'hard', practicality: 3, sideEffectRisk: 'low', riskDetail: 'Any reform risks perception of reducing entitlements; massive upfront cost; workforce shortages in specialist roles', sources: ['NAO', 'IPSEA', 'Special Needs Jungle'] },

  // --- Unpaid Care Economy ---
  { id: 'unpaid_care_crisis', label: 'Unpaid Care\nCrisis', type: 'cause', description: '10.6m unpaid carers in UK, contributing £162bn/year in care (more than NHS budget). 72% report mental health deterioration. 1.4m provide 50+ hours/week. Predominantly women. Invisible in economic statistics. Carer\'s Allowance is £81.90/week — lowest benefit relative to hours worked.', sources: ['Carers UK', 'ONS', 'House of Commons Library'] },
  { id: 'sol_carer_support', label: 'Carer Support\nReform', type: 'solution', description: 'Increase Carer\'s Allowance to at least minimum wage equivalent, provide respite care entitlement, flexible working rights for carers, pension credits for caring years, NHS carer health checks.', politicalDifficulty: 'medium', economicDifficulty: 'hard', practicality: 4, sideEffectRisk: 'low', riskDetail: 'Significant fiscal cost; difficulty defining and verifying caring responsibilities at scale', sources: ['Carers UK', 'House of Commons Work and Pensions Committee'] },

  // --- Corporate Tax Avoidance ---
  { id: 'corporate_tax_avoidance', label: 'Corporate Tax\nAvoidance', type: 'cause', description: 'UK loses estimated £35-70bn/year to tax avoidance and evasion. Multinationals shift profits to low-tax jurisdictions. HMRC understaffed — £1 spent on compliance generates £18 return. Tax gap widens inequality and forces austerity on public services.', sources: ['Tax Justice Network', 'HMRC', 'TUC'] },
  { id: 'sol_tax_reform', label: 'Corporate Tax\nReform', type: 'solution', description: 'Implement global minimum tax (Pillar 2), close loopholes, increase HMRC enforcement funding, digital services tax, beneficial ownership transparency, exit taxes on capital.', politicalDifficulty: 'hard', economicDifficulty: 'medium', practicality: 3, sideEffectRisk: 'medium', riskDetail: 'Capital flight risk; business lobbying; competitiveness concerns; requires international coordination', sources: ['Tax Justice Network', 'OECD', 'HMRC'] },

  // --- Preventive Healthcare ---
  { id: 'sol_preventive_health', label: 'Preventive\nHealthcare', type: 'solution', description: 'Shift NHS spending from treatment to prevention. Every £1 in prevention saves £14 in treatment. Includes smoking cessation, obesity programmes, vaccination, screening, public health campaigns. Currently only 5% of NHS budget goes to prevention.', politicalDifficulty: 'easy', economicDifficulty: 'medium', practicality: 4, sideEffectRisk: 'low', riskDetail: 'Benefits take years to materialise; short-term political incentives favour visible acute care spending', sources: ['Public Health England', 'Health Foundation', 'BMA'] },

  // --- Wealth Tax ---
  { id: 'sol_wealth_tax', label: 'Wealth Tax', type: 'solution', description: 'Annual tax on net wealth above £10m threshold. Could raise £22bn/year from 0.6% of population. Addresses extreme concentration (top 1% own 23% of wealth). Reduces intergenerational inequality. Norway, Switzerland, Spain already have wealth taxes.', politicalDifficulty: 'hard', economicDifficulty: 'medium', practicality: 2, sideEffectRisk: 'high', riskDetail: 'Capital flight risk; valuation complexity (illiquid assets); wealth concealment; political donor opposition', sources: ['Wealth Tax Commission', 'LSE', 'Tax Justice Network'] },

  // --- Right to Repair ---
  { id: 'sol_right_to_repair', label: 'Right to\nRepair', type: 'solution', description: 'Mandate manufacturers to provide spare parts, repair manuals, and software updates for 10+ years. Reduce e-waste (1.5m tonnes/year in UK), save consumers money, create local repair jobs. UK lags behind EU\'s comprehensive right to repair directive.', politicalDifficulty: 'easy', economicDifficulty: 'easy', practicality: 4, sideEffectRisk: 'low', riskDetail: 'Manufacturer lobbying; reduced planned obsolescence profits; initial compliance costs for businesses', sources: ['Restart Project', 'DEFRA', 'iFixit'] },

  // --- Social Mobility Decline ---
  { id: 'social_mobility_decline', label: 'Social Mobility\nDecline', type: 'cause', description: 'UK has lowest social mobility in developed world. A child\'s postcode and parents\' income are strongest predictors of life outcomes. Graduate premium declining. Professional careers increasingly require unpaid internships. Social mobility has stalled or reversed since 2010.', sources: ['Social Mobility Commission', 'Sutton Trust', 'OECD'] },

  // --- Third Sector Collapse ---
  { id: 'future_third_sector_collapse', label: 'Third Sector\nCollapse', type: 'future_problem', horizon: 'now', description: 'Charities and voluntary organisations facing existential funding crisis. 60%+ report increased demand but reduced funding. Many handing contracts back to councils. Services for vulnerable people (homeless, disabled, SEND) being abandoned. The "burnout cascade" — as public services cut, demand shifts to charities who also can\'t cope.', sources: ['NCVO', 'Pro Bono Economics', 'Charity Commission'] },

  // ── Round 2 topic clusters ──────────────────────

  // --- Homelessness Crisis ---
  { id: 'homelessness', label: 'Homelessness\nCrisis', type: 'cause', description: '300,000+ households in England experiencing worst forms of homelessness (2025). 7,700+ rough sleeping in a single month. 21% increase since 2022. Record spending on temporary accommodation. System is crisis-focused rather than preventive.', sources: ['Shelter', 'DLUHC', 'Crisis'] },
  { id: 'sol_homelessness_prevention', label: 'Homelessness\nPrevention', type: 'solution', description: 'Housing First model (Finland reduced homelessness 35%). Guarantee of accommodation on leaving prison/care/hospital. Fully fund local authority prevention duties. Ring-fence temporary accommodation funding.', politicalDifficulty: 'medium', economicDifficulty: 'medium', practicality: 4, sideEffectRisk: 'low', riskDetail: 'NIMBY resistance to hostels/Housing First properties; requires sustained multi-year funding commitment', sources: ['Crisis', 'Shelter', 'Y-Foundation (Finland)'] },

  // --- Leasehold Trap ---
  { id: 'leasehold_trap', label: 'Leasehold\nTrap', type: 'cause', description: '4.9m leasehold properties in England & Wales. Ground rent exploitation (some doubling every 10 years), permission fees for minor changes, unfair service charges, freeholder profiteering. Leaseholders don\'t truly own their homes. Reform repeatedly promised but delayed.', sources: ['Leasehold Knowledge Partnership', 'Law Commission', 'DLUHC'] },
  { id: 'sol_leasehold_reform', label: 'Leasehold\nReform', type: 'solution', description: 'Ban new leasehold houses (done), cap ground rents at peppercorn for existing leases, make enfranchisement (buying freehold) cheaper and simpler, commonhold as default for flats. Leasehold Reform Act 2024 was a start but incomplete.', politicalDifficulty: 'medium', economicDifficulty: 'medium', practicality: 4, sideEffectRisk: 'medium', riskDetail: 'Freeholder compensation costs; property developer lobbying; complex transition for existing leases; potential impact on property values', sources: ['Law Commission', 'National Leasehold Campaign', 'DLUHC'] },

  // --- Brain Drain ---
  { id: 'brain_drain', label: 'Brain Drain', type: 'cause', description: 'Increasing emigration of skilled UK workers (doctors, engineers, academics, tech workers) due to high cost of living, stagnant wages, and better opportunities abroad. Compounds existing workforce shortages in NHS, tech, and academia. Australia, Canada, UAE major destinations.', sources: ['GMC', 'ONS', 'HESA'] },
  { id: 'future_talent_exodus', label: 'Talent Exodus', type: 'future_problem', horizon: 'decade', description: 'Risk of self-reinforcing cycle: skilled workers leave → services decline → more leave. Particularly acute in healthcare (13% of UK-trained doctors working abroad) and tech (post-Brexit, post-OSA).', sources: ['GMC', 'BMA', 'Tech Nation'] },

  // --- Student Debt Burden ---
  { id: 'student_debt', label: 'Student Debt\nBurden', type: 'cause', description: '£182bn outstanding student loans. Plan 2 loans charging 7.3% interest (2023). Average graduate owes £45,000+. Deters lower-income students. Delays home ownership, family formation, and saving. Most debt will never be repaid — written off at taxpayer expense after 30-40 years.', sources: ['Student Loans Company', 'IFS', 'House of Commons Library'] },
  { id: 'sol_higher_ed_reform', label: 'Higher Education\nFunding Reform', type: 'solution', description: 'Options: reduce tuition fees, return to grant system for disadvantaged students, graduate tax replacing loans, employer co-funding for vocational degrees, expand degree apprenticeships.', politicalDifficulty: 'hard', economicDifficulty: 'hard', practicality: 3, sideEffectRisk: 'medium', riskDetail: 'Enormous fiscal cost of writing off existing debt; university funding gap if fees reduced; any reform creates winners and losers among existing/future graduates', sources: ['IFS', 'Augar Review', 'UUK'] },

  // --- Infrastructure Maintenance Backlog ---
  { id: 'infrastructure_backlog', label: 'Infrastructure\nMaintenance Backlog', type: 'cause', description: 'Decades of deferred maintenance across roads (£14bn repair backlog), bridges, schools (RAAC concrete crisis affecting 200+ schools), hospitals (£11.6bn NHS estate maintenance backlog). Patch-and-mend approach costs more long-term. Safety risks increasing.', sources: ['NAO', 'DfE', 'NHS Digital'] },
  { id: 'sol_infrastructure_investment', label: 'Infrastructure\nMaintenance Fund', type: 'solution', description: 'Ring-fenced multi-year infrastructure maintenance budget. Prioritise safety-critical repairs (RAAC, structurally deficient bridges). Preventive maintenance costs 4-5x less than emergency repairs. National asset register to track condition.', politicalDifficulty: 'easy', economicDifficulty: 'hard', practicality: 5, sideEffectRisk: 'low', riskDetail: 'Competes with other spending priorities; less politically visible than new builds; requires sustained commitment across electoral cycles', sources: ['NAO', 'ICE', 'IPA'] },

  // --- Domestic Abuse ---
  { id: 'domestic_abuse', label: 'Domestic Abuse\nCrisis', type: 'cause', description: '2.3m victims/year in England & Wales. Refuge services turning away 60%+ of referrals due to lack of space/funding. £66bn annual economic cost. Linked to homelessness (largest single cause for women). Intersects with poverty, mental health, and children\'s outcomes.', sources: ['ONS', 'Women\'s Aid', 'SafeLives'] },
  { id: 'sol_domestic_abuse_funding', label: 'Domestic Abuse\nServices Funding', type: 'solution', description: 'Guarantee sustainable multi-year funding for refuges and support services. Currently 60% of funding from local authorities with no ring-fencing. Implement Domestic Abuse Act 2021 fully. Perpetrator programmes, legal aid restoration.', politicalDifficulty: 'easy', economicDifficulty: 'medium', practicality: 4, sideEffectRisk: 'low', riskDetail: 'Cross-party support in principle but competes with other local government priorities; enforcement of perpetrator programmes challenging', sources: ['Women\'s Aid', 'SafeLives', 'Domestic Abuse Commissioner'] },

  // --- Digital Divide ---
  { id: 'digital_divide', label: 'Digital Divide', type: 'cause', description: '2.4m older people digitally excluded. 5.4m adults have zero basic digital skills. As services move online (NHS, banking, benefits, council services), exclusion translates to inability to access essential services. Rural broadband gaps persist. Low-income households can\'t afford devices/data.', sources: ['Ofcom', 'Lloyds Bank Digital Index', 'Good Things Foundation'] },
  { id: 'sol_digital_inclusion', label: 'Digital Inclusion\nProgramme', type: 'solution', description: 'Subsidised broadband/devices for low-income households, guaranteed offline alternatives for essential services, community digital skills training, public library digital hubs. Social tariffs mandated for all ISPs.', politicalDifficulty: 'easy', economicDifficulty: 'easy', practicality: 4, sideEffectRisk: 'low', riskDetail: 'ISP lobbying against mandated social tariffs; maintaining offline services costs more; training needs sustained funding', sources: ['Good Things Foundation', 'Ofcom', 'DCMS'] },

  // --- Triple Lock Unsustainability ---
  { id: 'triple_lock_unsustainable', label: 'Triple Lock\nUnsustainability', type: 'cause', description: 'State pension triple lock (highest of inflation, earnings, 2.5%) is fiscally unsustainable with aging demographics. Could push pension age to 74 by 2060s. State pension spending projected to rise from 5% to 8%+ of GDP. Politically untouchable — 12m pensioner votes. Creates intergenerational unfairness.', sources: ['OBR', 'IFS', 'Resolution Foundation'] },
  { id: 'future_pension_age_rise', label: 'Pension Age\nRise to 71-74', type: 'future_problem', horizon: '30years', description: 'Without reform, pension age must rise dramatically or taxes on working-age population become unsustainable. Risk of pensioner poverty if state pension cut instead. No good options without early action.', sources: ['OBR', 'IFS', 'Pensions Policy Institute'] },

  // ── CHILD ABUSE & SAFEGUARDING ──
  { id: 'child_abuse_crisis', label: 'Child Abuse &\nSafeguarding Crisis', type: 'cause', description: '500,000+ child protection referrals/year in England. 50,000+ on child protection plans. Social worker vacancies at 17%. Serious Case Reviews repeatedly find same systemic failures. Post-Rotherham reforms still inadequate. 1 in 5 children experience abuse before age 18.', sources: ['DfE', 'NSPCC', 'Ofsted', 'Independent Inquiry into Child Sexual Abuse'] },
  { id: 'child_exploitation', label: 'Child Sexual\nExploitation', type: 'cause', description: 'Grooming gangs in Rotherham, Rochdale, Telford, Oxford etc exposed systemic failures. 16,000+ potential victims identified by IICSA. Online CSAM referrals to IWF up 87% since 2019 (275,000+ reports/year). County lines: 27,000 children at risk of gang exploitation. Political football but structural causes (poverty, care system, policing) rarely addressed.', sources: ['IICSA', 'NCA', 'IWF', 'Children\'s Commissioner'] },
  { id: 'children_in_care', label: 'Children in\nCare Crisis', type: 'cause', description: '83,840 looked-after children in England (highest ever). Private providers control 83% of children\'s homes, charging £4,000-5,000/week (£200k-260k/year per child). Outcomes: 41% of care leavers NEET at 19-21, 25% experience homelessness within 2 years. Total cost: £11bn/year. Fostering recruitment in freefall.', sources: ['DfE', 'Competition and Markets Authority', 'Ofsted', 'Care Review (Josh MacAlister)'] },
  { id: 'social_worker_shortage', label: 'Social Worker\nShortage', type: 'cause', description: 'Children\'s social worker vacancy rate 17% nationally (30%+ in London). Average caseload 18-25 children (recommended max: 15). 1 in 3 leave within first 2 years. Agency staff cost councils 3x more. Burnout epidemic: 78% report unsustainable stress. Victoria Climbié, Baby P, Arthur Labinjo-Hughes — recurring tragedies linked to overworked staff.', sources: ['DfE', 'BASW', 'Community Care', 'What Works Centre for Children\'s Social Care'] },
  { id: 'sol_child_safeguarding', label: 'Child Safeguarding\nReform', type: 'solution', description: 'Implement MacAlister Care Review: regional care cooperatives to break private provider monopoly, mandatory reporting of child abuse, social worker bursary scheme, supervised year for newly qualified workers, multi-agency safeguarding hubs in every area, family help system to intervene earlier.', politicalDifficulty: 'medium', economicDifficulty: 'medium', practicality: 4, sideEffectRisk: 'low', riskDetail: 'Private care home industry will lobby against; requires sustained funding commitment; culture change takes years', sources: ['MacAlister Care Review', 'NSPCC', 'ADCS'] },
  { id: 'sol_online_child_protection', label: 'Online Child\nProtection', type: 'solution', description: 'Privacy-preserving age assurance (not ID upload), platform duty of care for children, mandatory CSAM scanning with independent oversight, design codes for children\'s apps, digital literacy in schools, dedicated online child exploitation policing units.', politicalDifficulty: 'easy', economicDifficulty: 'easy', practicality: 3, sideEffectRisk: 'medium', riskDetail: 'Tension between privacy and child safety; risk of overblocking; false positives in CSAM scanning; surveillance scope creep', sources: ['5Rights Foundation', 'IWF', 'Children\'s Commissioner', 'ICO'] },

  // ── YOUTH MENTAL HEALTH ──
  { id: 'youth_mental_health', label: 'Youth Mental\nHealth Crisis', type: 'cause', description: '1 in 5 children aged 8-16 have a probable mental disorder (up from 1 in 9 in 2017). CAMHS waiting lists: 400,000+ children waiting, average wait 18 months. Self-harm hospital admissions for girls up 68% in decade. Social media linked to anxiety, body image issues, sleep disruption. 75% of adult mental illness starts before age 18 — early intervention saves £10 for every £1 spent.', sources: ['NHS Digital', 'Young Minds', 'Children\'s Commissioner', 'Royal College of Psychiatrists'] },
  { id: 'sol_youth_mental_health', label: 'Youth Mental\nHealth Investment', type: 'solution', description: 'Counsellor in every school, CAMHS waiting time guarantee (4 weeks), social media age verification with design codes, mental health first aid training for teachers, early intervention hubs, parental support programmes, regulate addictive app design for under-18s.', politicalDifficulty: 'easy', economicDifficulty: 'medium', practicality: 4, sideEffectRisk: 'low', riskDetail: 'Workforce shortage for counsellors; medicalisation concerns; school capacity constraints', sources: ['Young Minds', 'Anna Freud Centre', 'Mental Health Foundation'] },
  { id: 'future_social_media_harm', label: 'Social Media\nGeneration Damage', type: 'future_problem', horizon: 'decade', description: 'First generation raised on smartphones/social media showing unprecedented mental health deterioration. Algorithm-driven radicalisation, body image crisis, attention span reduction, sleep disruption. Long-term effects on cognitive development, social skills, and democratic participation unknown.', sources: ['Jonathan Haidt', 'Jean Twenge', 'Royal Society for Public Health'] },

  // ── COMMUNITY COHESION & IMMIGRATION (BALANCED) ──
  { id: 'community_cohesion', label: 'Community\nCohesion Strain', type: 'cause', description: 'Casey Review (2016) found increasing segregation in some areas. 40% of ethnic minorities report experiencing discrimination. Parallel communities with limited interaction. Integration outcomes vary hugely by group. Genuine concerns weaponised by far-right. Net migration of 685,000 (2023) creating housing/service pressure faster than infrastructure expands.', sources: ['Casey Review', 'Policy Exchange', 'Runnymede Trust', 'Migration Observatory'] },
  { id: 'asylum_system_failure', label: 'Asylum System\nFailure', type: 'cause', description: '175,000+ asylum backlog. Average decision wait: 15 months (was 6 months in 2014). £8m/day on hotel accommodation. No right to work while waiting, creating dependency and resentment. Rwanda policy cost £700m for zero deportations. Both "too harsh" and "too soft" simultaneously. Safe routes would reduce channel crossings but politically toxic.', sources: ['Home Office', 'Refugee Council', 'NAO', 'UNHCR'] },
  { id: 'sol_integration_strategy', label: 'Integration\nStrategy', type: 'solution', description: 'Community-based integration programmes (ESOL funding, mentoring, mixed housing), points-based immigration with regional variation, fast asylum processing (6-month guarantee), right to work for asylum seekers, counter-extremism with community engagement not surveillance, local integration boards.', politicalDifficulty: 'hard', economicDifficulty: 'easy', practicality: 3, sideEffectRisk: 'medium', riskDetail: 'Perceived as "soft" by right; implementation varies by local context; requires cross-party commitment', sources: ['Casey Review', 'Migration Advisory Committee', 'UNHCR', 'British Future'] },

  // ── KNIFE CRIME & YOUTH VIOLENCE ──
  { id: 'knife_crime', label: 'Knife Crime &\nYouth Violence', type: 'cause', description: '49,000+ knife crime offences/year in England & Wales. 30% of victims under 25. 282 knife homicides in 2023. County lines: 2,000+ drug lines exploiting children. Youth service funding cut 73% since 2010 — direct correlation with rising youth violence. Public health approach (Glasgow model) reduced knife crime 69% but rarely replicated.', sources: ['ONS', 'Youth Violence Commission', 'Violence Reduction Units', 'Home Office'] },
  { id: 'sol_violence_reduction', label: 'Public Health\nViolence Approach', type: 'solution', description: 'Glasgow model: treat violence as public health issue not just criminal justice. Targeted mentoring, hospital-based intervention (33% reoffending reduction), youth outreach workers, restore youth service funding, trauma-informed policing, early intervention with at-risk families. Every £1 spent saves £14 in criminal justice costs.', politicalDifficulty: 'medium', economicDifficulty: 'easy', practicality: 5, sideEffectRisk: 'low', riskDetail: 'Seen as "soft on crime" by some; requires multi-agency coordination; results take years', sources: ['Scottish Violence Reduction Unit', 'Youth Endowment Fund', 'WHO'] },

  // ── DEFENCE & SECURITY ──
  { id: 'defence_underfunding', label: 'Defence &\nSecurity Gap', type: 'cause', description: 'UK defence spending 2.3% GDP (NATO target 2.5%, rising to 3%). Armed forces smallest since Napoleonic era (73,000 regular army). Equipment procurement £17bn over budget. Hollowed-out capabilities: 2 carriers but not enough escorts, ammunition stocks depleted. Ukraine war exposed European dependence on US.', sources: ['NAO', 'RUSI', 'House of Commons Defence Committee', 'IISS'] },
  { id: 'sol_defence_investment', label: 'Defence\nModernisation', type: 'solution', description: 'Commit to 3% GDP defence spending, prioritise procurement reform, invest in drones/AI/cyber over legacy platforms, European defence cooperation post-Ukraine, rebuild ammunition stockpiles, armed forces recruitment/retention reform (40% attrition in first 4 years).', politicalDifficulty: 'medium', economicDifficulty: 'hard', practicality: 3, sideEffectRisk: 'medium', riskDetail: 'Competes with domestic spending; procurement reform resisted by defence industry; European cooperation complicated post-Brexit', sources: ['RUSI', 'IISS', 'NATO', 'House of Commons Defence Committee'] },
  { id: 'future_security_vacuum', label: 'European\nSecurity Vacuum', type: 'future_problem', horizon: 'decade', description: 'US pivot to Indo-Pacific and potential NATO drawdown. Europe lacks independent defence capability. Russian revanchism, Chinese assertiveness, hybrid warfare increasing. Defence industrial base hollowed out — can\'t surge production.', sources: ['RUSI', 'ECFR', 'Chatham House'] },

  // ── BALANCED PERSPECTIVES ──
  { id: 'brexit_sovereignty', label: 'Regulatory\nIndependence', type: 'cause', description: 'Brexit delivered regulatory autonomy: own trade deals, immigration policy, fishing rights. UK-Australia/NZ deals. Freeports. Potential divergence in AI, fintech, gene editing. However, economic costs (4% GDP hit per OBR) have so far outweighed sovereignty benefits. Political class divided on divergence vs re-alignment.', sources: ['UK Trade Policy Observatory', 'OBR', 'Institute for Government'] },
];

export const edges = [
  // ════════════════════════════════════════════════
  //  CAUSAL RELATIONSHIPS
  // ════════════════════════════════════════════════

  // --- Housing Affordability ---
  { source: 'housing_supply', target: 'housing_unaffordable', label: 'causes' },
  { source: 'high_rents', target: 'housing_unaffordable', label: 'causes' },
  { source: 'wage_stagnation', target: 'housing_unaffordable', label: 'causes' },
  { source: 'financialisation', target: 'housing_unaffordable', label: 'causes' },
  { source: 'population_pressure', target: 'housing_unaffordable', label: 'causes' },

  // Housing supply root causes
  { source: 'planning_system', target: 'housing_supply', label: 'causes' },
  { source: 'land_banking', target: 'housing_supply', label: 'causes' },

  // High rents
  { source: 'housing_supply', target: 'high_rents', label: 'causes' },
  { source: 'financialisation', target: 'high_rents', label: 'causes' },
  { source: 'population_pressure', target: 'high_rents', label: 'causes' },

  // --- NHS Crisis ---
  { source: 'nhs_underfunding', target: 'nhs_crisis', label: 'causes' },
  { source: 'staff_shortages', target: 'nhs_crisis', label: 'causes' },
  { source: 'social_care_failure', target: 'nhs_crisis', label: 'causes' },
  { source: 'population_pressure', target: 'nhs_crisis', label: 'causes' },

  // NHS underfunding
  { source: 'austerity', target: 'nhs_underfunding', label: 'causes' },
  { source: 'short_termism', target: 'nhs_underfunding', label: 'causes' },

  // Staff shortages
  { source: 'training_failures', target: 'staff_shortages', label: 'causes' },
  { source: 'brexit_impact', target: 'staff_shortages', label: 'causes' },
  { source: 'wage_stagnation', target: 'staff_shortages', label: 'causes' },

  // Social care failure
  { source: 'austerity', target: 'social_care_failure', label: 'causes' },
  { source: 'short_termism', target: 'social_care_failure', label: 'causes' },
  { source: 'wage_stagnation', target: 'social_care_failure', label: 'causes' },

  // --- Cost of Living ---
  { source: 'high_energy_prices', target: 'cost_of_living', label: 'causes' },
  { source: 'food_inflation', target: 'cost_of_living', label: 'causes' },
  { source: 'high_rents', target: 'cost_of_living', label: 'causes' },
  { source: 'wage_stagnation', target: 'cost_of_living', label: 'causes' },
  { source: 'tax_burden', target: 'cost_of_living', label: 'causes' },

  // Energy prices
  { source: 'gas_dependency', target: 'high_energy_prices', label: 'causes' },
  { source: 'global_energy_shocks', target: 'high_energy_prices', label: 'causes' },

  // Food inflation
  { source: 'high_energy_prices', target: 'food_inflation', label: 'causes' },
  { source: 'brexit_impact', target: 'food_inflation', label: 'causes' },

  // Tax burden
  { source: 'austerity', target: 'tax_burden', label: 'causes' },
  { source: 'nhs_underfunding', target: 'tax_burden', label: 'causes' },

  // Childcare
  { source: 'childcare_costs', target: 'cost_of_living', label: 'causes' },
  { source: 'childcare_costs', target: 'future_birthrate_decline', label: 'causes' },
  { source: 'childcare_costs', target: 'maternal_employment_penalty', label: 'causes' },
  { source: 'childcare_costs', target: 'poverty_deprivation', label: 'causes' },
  { source: 'childcare_supply_shortage', target: 'childcare_costs', label: 'causes' },
  { source: 'childcare_workforce_crisis', target: 'childcare_supply_shortage', label: 'causes' },
  { source: 'childcare_workforce_crisis', target: 'childcare_costs', label: 'causes' },
  { source: 'austerity', target: 'childcare_supply_shortage', label: 'causes' },
  { source: 'inadequate_parental_leave', target: 'childcare_costs', label: 'causes' },
  { source: 'inadequate_parental_leave', target: 'maternal_employment_penalty', label: 'causes' },
  { source: 'maternal_employment_penalty', target: 'wage_stagnation', label: 'causes' },
  { source: 'maternal_employment_penalty', target: 'low_productivity', label: 'causes' },
  { source: 'maternal_employment_penalty', target: 'future_gender_inequality_entrenchment', label: 'causes' },
  { source: 'childcare_costs', target: 'future_gender_inequality_entrenchment', label: 'causes' },

  // --- Low Growth ---
  { source: 'low_productivity', target: 'low_growth', label: 'causes' },
  { source: 'low_investment', target: 'low_growth', label: 'causes' },
  { source: 'brexit_impact', target: 'low_growth', label: 'causes' },
  { source: 'skills_mismatch', target: 'low_growth', label: 'causes' },

  // Low productivity
  { source: 'low_investment', target: 'low_productivity', label: 'causes' },
  { source: 'training_failures', target: 'low_productivity', label: 'causes' },
  { source: 'poor_infrastructure', target: 'low_productivity', label: 'causes' },

  // Low investment
  { source: 'brexit_impact', target: 'low_investment', label: 'causes' },
  { source: 'short_termism', target: 'low_investment', label: 'causes' },

  // --- Wage Stagnation ---
  { source: 'low_productivity', target: 'wage_stagnation', label: 'causes' },
  { source: 'weak_unions', target: 'wage_stagnation', label: 'causes' },
  { source: 'brexit_impact', target: 'wage_stagnation', label: 'causes' },

  // --- Regional Inequality ---
  { source: 'london_centrism', target: 'inequality', label: 'causes' },
  { source: 'poor_infrastructure', target: 'inequality', label: 'causes' },
  { source: 'austerity', target: 'inequality', label: 'causes' },
  { source: 'uneven_devolution', target: 'inequality', label: 'causes' },

  // London centrism
  { source: 'centralised_governance', target: 'london_centrism', label: 'causes' },
  { source: 'short_termism', target: 'london_centrism', label: 'causes' },

  // Uneven devolution
  { source: 'centralised_governance', target: 'uneven_devolution', label: 'causes' },

  // --- Education & Skills ---
  { source: 'school_funding_squeeze', target: 'education_crisis', label: 'causes' },
  { source: 'attainment_gap', target: 'education_crisis', label: 'causes' },
  { source: 'skills_mismatch', target: 'education_crisis', label: 'causes' },

  // School funding squeeze
  { source: 'austerity', target: 'school_funding_squeeze', label: 'causes' },

  // Attainment gap
  { source: 'poverty_deprivation', target: 'attainment_gap', label: 'causes' },
  { source: 'school_funding_squeeze', target: 'attainment_gap', label: 'causes' },

  // Skills mismatch
  { source: 'training_failures', target: 'skills_mismatch', label: 'causes' },

  // Training failures ← austerity
  { source: 'austerity', target: 'training_failures', label: 'causes' },

  // --- Climate & Energy ---
  { source: 'gas_dependency', target: 'climate_challenge', label: 'causes' },
  { source: 'grid_constraints', target: 'climate_challenge', label: 'causes' },
  { source: 'green_skills_gap', target: 'climate_challenge', label: 'causes' },
  { source: 'short_termism', target: 'climate_challenge', label: 'causes' },

  // Green skills gap
  { source: 'training_failures', target: 'green_skills_gap', label: 'causes' },

  // Grid constraints
  { source: 'low_investment', target: 'grid_constraints', label: 'causes' },

  // --- Crime & Social Breakdown ---
  { source: 'policing_cuts', target: 'crime_social', label: 'causes' },
  { source: 'youth_service_cuts', target: 'crime_social', label: 'causes' },
  { source: 'mental_health_crisis', target: 'crime_social', label: 'causes' },
  { source: 'prison_overcrowding', target: 'crime_social', label: 'causes' },
  { source: 'poverty_deprivation', target: 'crime_social', label: 'causes' },

  // Policing cuts
  { source: 'austerity', target: 'policing_cuts', label: 'causes' },

  // Youth service cuts
  { source: 'austerity', target: 'youth_service_cuts', label: 'causes' },

  // Mental health crisis
  { source: 'austerity', target: 'mental_health_crisis', label: 'causes' },
  { source: 'poverty_deprivation', target: 'mental_health_crisis', label: 'causes' },

  // Poverty ← wage stagnation, cost of living
  { source: 'wage_stagnation', target: 'poverty_deprivation', label: 'causes' },
  { source: 'cost_of_living', target: 'poverty_deprivation', label: 'causes' },

  // Cross-cutting links
  { source: 'inequality', target: 'poverty_deprivation', label: 'causes' },
  { source: 'education_crisis', target: 'low_productivity', label: 'causes' },
  { source: 'crime_social', target: 'low_growth', label: 'causes' },

  // --- Democratic Deficit ---
  { source: 'voter_apathy', target: 'democratic_deficit', label: 'causes' },
  { source: 'political_disconnect', target: 'democratic_deficit', label: 'causes' },
  { source: 'fptp_system', target: 'democratic_deficit', label: 'causes' },
  { source: 'media_concentration', target: 'democratic_deficit', label: 'causes' },
  { source: 'lobbying_influence', target: 'democratic_deficit', label: 'causes' },

  // Voter apathy causes
  { source: 'fptp_system', target: 'voter_apathy', label: 'causes' },
  { source: 'political_disconnect', target: 'voter_apathy', label: 'causes' },
  { source: 'demographic_turnout_gap', target: 'voter_apathy', label: 'causes' },
  { source: 'media_concentration', target: 'voter_apathy', label: 'causes' },
  { source: 'poverty_deprivation', target: 'voter_apathy', label: 'causes' },

  // Political disconnect causes
  { source: 'lobbying_influence', target: 'political_disconnect', label: 'causes' },
  { source: 'media_concentration', target: 'political_disconnect', label: 'causes' },
  { source: 'inequality', target: 'political_disconnect', label: 'causes' },

  // Democratic deficit feeds back into other problems
  { source: 'democratic_deficit', target: 'inequality', label: 'causes' },
  { source: 'voter_apathy', target: 'demographic_turnout_gap', label: 'causes' },

  // --- Fiscal Drag & Tax ---
  { source: 'fiscal_drag', target: 'cost_of_living', label: 'causes' },
  { source: 'fiscal_drag', target: 'inequality', label: 'causes' },
  { source: 'fiscal_drag', target: 'voter_apathy', label: 'causes' },
  { source: 'fiscal_drag', target: 'wage_stagnation', label: 'causes' },

  // --- US Tariffs ---
  { source: 'us_tariffs', target: 'cost_of_living', label: 'causes' },
  { source: 'us_tariffs', target: 'low_growth', label: 'causes' },
  { source: 'us_tariffs', target: 'low_investment', label: 'causes' },

  // --- Financial Services Erosion ---
  { source: 'financial_services_erosion', target: 'low_growth', label: 'causes' },
  { source: 'financial_services_erosion', target: 'inequality', label: 'causes' },
  { source: 'brexit_impact', target: 'financial_services_erosion', label: 'causes' },

  // --- Workforce Immigration Dependency ---
  { source: 'workforce_immigration_dependency', target: 'staff_shortages', label: 'causes' },
  { source: 'workforce_immigration_dependency', target: 'nhs_crisis', label: 'causes' },

  // ════════════════════════════════════════════════
  //  SOLUTIONS → PROBLEMS/CAUSES
  // ════════════════════════════════════════════════
  { source: 'sol_planning_reform', target: 'planning_system', label: 'solves' },
  { source: 'sol_planning_reform', target: 'housing_supply', label: 'solves' },
  { source: 'sol_social_housing', target: 'housing_supply', label: 'solves' },
  { source: 'sol_social_housing', target: 'housing_unaffordable', label: 'solves' },
  { source: 'sol_rent_controls', target: 'high_rents', label: 'solves' },
  { source: 'sol_nhs_funding', target: 'nhs_underfunding', label: 'solves' },
  { source: 'sol_social_care_reform', target: 'social_care_failure', label: 'solves' },
  { source: 'sol_social_care_reform', target: 'nhs_crisis', label: 'solves' },
  { source: 'sol_train_staff', target: 'staff_shortages', label: 'solves' },
  { source: 'sol_train_staff', target: 'training_failures', label: 'solves' },
  { source: 'sol_renewables', target: 'gas_dependency', label: 'solves' },
  { source: 'sol_renewables', target: 'high_energy_prices', label: 'solves' },
  { source: 'sol_renewables', target: 'climate_challenge', label: 'solves' },
  { source: 'sol_insulation', target: 'high_energy_prices', label: 'solves' },
  { source: 'sol_insulation', target: 'cost_of_living', label: 'solves' },

  // Childcare solutions
  { source: 'sol_universal_childcare', target: 'childcare_costs', label: 'solves' },
  { source: 'sol_universal_childcare', target: 'childcare_supply_shortage', label: 'solves' },
  { source: 'sol_universal_childcare', target: 'cost_of_living', label: 'solves' },
  { source: 'sol_universal_childcare', target: 'future_birthrate_decline', label: 'solves' },
  { source: 'sol_universal_childcare', target: 'maternal_employment_penalty', label: 'solves' },
  { source: 'sol_childcare_workforce_pay', target: 'childcare_workforce_crisis', label: 'solves' },
  { source: 'sol_childcare_workforce_pay', target: 'childcare_supply_shortage', label: 'solves' },
  { source: 'sol_parental_leave_reform', target: 'inadequate_parental_leave', label: 'solves' },
  { source: 'sol_parental_leave_reform', target: 'maternal_employment_penalty', label: 'solves' },
  { source: 'sol_parental_leave_reform', target: 'future_birthrate_decline', label: 'solves' },
  { source: 'sol_parental_leave_reform', target: 'future_gender_inequality_entrenchment', label: 'solves' },
  { source: 'sol_flexible_working', target: 'maternal_employment_penalty', label: 'solves' },
  { source: 'sol_flexible_working', target: 'childcare_costs', label: 'solves' },
  { source: 'sol_industrial_strategy', target: 'low_investment', label: 'solves' },
  { source: 'sol_industrial_strategy', target: 'low_growth', label: 'solves' },
  { source: 'sol_industrial_strategy', target: 'low_productivity', label: 'solves' },
  { source: 'sol_devolution', target: 'london_centrism', label: 'solves' },
  { source: 'sol_devolution', target: 'inequality', label: 'solves' },
  { source: 'sol_devolution', target: 'centralised_governance', label: 'solves' },
  { source: 'sol_devolution', target: 'uneven_devolution', label: 'solves' },
  { source: 'sol_transport_investment', target: 'poor_infrastructure', label: 'solves' },
  { source: 'sol_transport_investment', target: 'inequality', label: 'solves' },
  { source: 'sol_trade_alignment', target: 'brexit_impact', label: 'solves' },
  { source: 'sol_skills_investment', target: 'training_failures', label: 'solves' },
  { source: 'sol_skills_investment', target: 'low_productivity', label: 'solves' },
  { source: 'sol_skills_investment', target: 'skills_mismatch', label: 'solves' },
  { source: 'sol_skills_investment', target: 'green_skills_gap', label: 'solves' },
  { source: 'sol_wage_policy', target: 'wage_stagnation', label: 'solves' },
  { source: 'sol_wage_policy', target: 'weak_unions', label: 'solves' },
  { source: 'sol_drug_reform', target: 'crime_social', label: 'solves' },
  { source: 'sol_drug_reform', target: 'prison_overcrowding', label: 'solves' },
  { source: 'sol_mental_health', target: 'mental_health_crisis', label: 'solves' },
  { source: 'sol_mental_health', target: 'crime_social', label: 'solves' },
  { source: 'sol_school_funding', target: 'school_funding_squeeze', label: 'solves' },
  { source: 'sol_school_funding', target: 'attainment_gap', label: 'solves' },
  { source: 'sol_school_funding', target: 'education_crisis', label: 'solves' },
  { source: 'sol_grid_upgrade', target: 'grid_constraints', label: 'solves' },
  { source: 'sol_grid_upgrade', target: 'climate_challenge', label: 'solves' },
  { source: 'sol_prison_reform', target: 'prison_overcrowding', label: 'solves' },
  { source: 'sol_prison_reform', target: 'crime_social', label: 'solves' },

  // Democracy solutions
  { source: 'sol_proportional_representation', target: 'fptp_system', label: 'solves' },
  { source: 'sol_proportional_representation', target: 'voter_apathy', label: 'solves' },
  { source: 'sol_proportional_representation', target: 'democratic_deficit', label: 'solves' },
  { source: 'sol_lobbying_reform', target: 'lobbying_influence', label: 'solves' },
  { source: 'sol_lobbying_reform', target: 'political_disconnect', label: 'solves' },
  { source: 'sol_civic_education', target: 'voter_apathy', label: 'solves' },
  { source: 'sol_civic_education', target: 'demographic_turnout_gap', label: 'solves' },
  { source: 'sol_votes_at_16', target: 'demographic_turnout_gap', label: 'solves' },
  { source: 'sol_votes_at_16', target: 'voter_apathy', label: 'solves' },
  { source: 'sol_media_plurality', target: 'media_concentration', label: 'solves' },
  { source: 'sol_media_plurality', target: 'political_disconnect', label: 'solves' },

  // Disinformation also undermines democracy
  { source: 'future_disinformation', target: 'voter_apathy', label: 'causes' },
  { source: 'future_disinformation', target: 'democratic_deficit', label: 'causes' },
  { source: 'sol_media_literacy', target: 'voter_apathy', label: 'solves' },

  // --- Blind Spot Solutions ---
  { source: 'sol_threshold_indexation', target: 'fiscal_drag', label: 'solves' },
  { source: 'sol_threshold_indexation', target: 'cost_of_living', label: 'solves' },
  { source: 'sol_trade_diversification', target: 'us_tariffs', label: 'solves' },
  { source: 'sol_trade_diversification', target: 'low_growth', label: 'solves' },
  { source: 'sol_eu_financial_alignment', target: 'financial_services_erosion', label: 'solves' },
  { source: 'sol_eu_financial_alignment', target: 'low_growth', label: 'solves' },
  { source: 'sol_ni_relief', target: 'wage_stagnation', label: 'solves' },
  { source: 'sol_ni_relief', target: 'cost_of_living', label: 'solves' },

  // ════════════════════════════════════════════════
  //  POLICIES → SOLUTIONS (implements)
  // ════════════════════════════════════════════════
  { source: 'pol_planning_bill', target: 'sol_planning_reform', label: 'implements' },
  { source: 'pol_planning_bill', target: 'sol_social_housing', label: 'implements' },
  { source: 'pol_nhs_10yr', target: 'sol_nhs_funding', label: 'implements' },
  { source: 'pol_nhs_10yr', target: 'sol_train_staff', label: 'implements' },
  { source: 'pol_nhs_10yr', target: 'sol_social_care_reform', label: 'implements' },
  { source: 'pol_gb_energy', target: 'sol_renewables', label: 'implements' },
  { source: 'pol_clean_power_2030', target: 'sol_renewables', label: 'implements' },
  { source: 'pol_clean_power_2030', target: 'sol_grid_upgrade', label: 'implements' },
  { source: 'pol_immigration_wp', target: 'population_pressure', label: 'implements' },
  { source: 'pol_crime_bill', target: 'crime_social', label: 'implements' },
  { source: 'pol_devolution_deals', target: 'sol_devolution', label: 'implements' },
  { source: 'pol_national_wealth_fund', target: 'sol_industrial_strategy', label: 'implements' },
  { source: 'pol_national_wealth_fund', target: 'sol_transport_investment', label: 'implements' },
  { source: 'pol_skills_england', target: 'sol_skills_investment', label: 'implements' },
  { source: 'pol_childcare_expansion', target: 'sol_universal_childcare', label: 'implements' },

  // --- Blind Spot Policy Links ---
  { source: 'pol_employer_ni_hike', target: 'sol_ni_relief', label: 'implements' },
  { source: 'pol_frozen_thresholds', target: 'fiscal_drag', label: 'causes' },

  // ════════════════════════════════════════════════
  //  RISKS — future problems caused by policies
  // ════════════════════════════════════════════════
  { source: 'pol_planning_bill', target: 'future_green_belt_loss', label: 'risks' },
  { source: 'pol_planning_bill', target: 'future_community_backlash', label: 'risks' },
  { source: 'pol_immigration_wp', target: 'future_labour_shortages', label: 'risks' },
  { source: 'pol_immigration_wp', target: 'future_nhs_recruitment_crisis', label: 'risks' },
  { source: 'pol_crime_bill', target: 'future_civil_liberties', label: 'risks' },
  { source: 'pol_clean_power_2030', target: 'future_transition_costs', label: 'risks' },
  { source: 'pol_clean_power_2030', target: 'future_fossil_job_losses', label: 'risks' },
  { source: 'pol_childcare_expansion', target: 'future_childcare_collapse', label: 'risks' },
  { source: 'pol_gb_energy', target: 'future_transition_costs', label: 'risks' },
  { source: 'pol_nhs_10yr', target: 'future_digital_exclusion', label: 'risks' },
  { source: 'pol_nhs_10yr', target: 'future_privatisation_creep', label: 'risks' },
  { source: 'pol_national_wealth_fund', target: 'future_misallocation', label: 'risks' },
  { source: 'pol_devolution_deals', target: 'future_postcode_lottery', label: 'risks' },

  // Online Safety Act & VPN/IP restrictions risks
  { source: 'pol_online_safety_act', target: 'future_encryption_weakening', label: 'risks' },
  { source: 'pol_online_safety_act', target: 'future_id_fraud_risk', label: 'risks' },
  { source: 'pol_online_safety_act', target: 'future_uk_tech_exodus', label: 'risks' },
  { source: 'pol_online_safety_act', target: 'future_censorship_creep', label: 'risks' },
  { source: 'pol_vpn_ip_bill', target: 'future_surveillance_normalisation', label: 'risks' },
  { source: 'pol_vpn_ip_bill', target: 'future_uk_tech_exodus', label: 'risks' },
  { source: 'pol_vpn_ip_bill', target: 'future_encryption_weakening', label: 'risks' },
  { source: 'pol_crime_bill', target: 'future_surveillance_normalisation', label: 'risks' },

  // --- Blind Spot Risks ---
  { source: 'pol_employer_ni_hike', target: 'future_sme_collapse', label: 'risks' },
  { source: 'pol_employer_ni_hike', target: 'future_care_staffing_crisis', label: 'risks' },
  { source: 'us_tariffs', target: 'future_trade_war_escalation', label: 'causes' },
  { source: 'pol_frozen_thresholds', target: 'future_sme_collapse', label: 'risks' },
  { source: 'financial_services_erosion', target: 'future_financial_hub_decline', label: 'causes' },
  { source: 'pol_immigration_wp', target: 'future_care_staffing_crisis', label: 'risks' },
  { source: 'workforce_immigration_dependency', target: 'future_care_staffing_crisis', label: 'causes' },

  // Future problems can also cause other future or current problems
  { source: 'future_labour_shortages', target: 'social_care_failure', label: 'causes' },
  { source: 'future_labour_shortages', target: 'food_inflation', label: 'causes' },
  { source: 'future_nhs_recruitment_crisis', target: 'staff_shortages', label: 'causes' },
  { source: 'future_fossil_job_losses', target: 'inequality', label: 'causes' },
  { source: 'future_transition_costs', target: 'cost_of_living', label: 'causes' },
  { source: 'future_green_belt_loss', target: 'climate_challenge', label: 'causes' },
  { source: 'future_privatisation_creep', target: 'inequality', label: 'causes' },
  { source: 'future_postcode_lottery', target: 'inequality', label: 'causes' },

  // Privacy/security future problems downstream effects
  { source: 'future_encryption_weakening', target: 'crime_social', label: 'causes' },
  { source: 'future_encryption_weakening', target: 'future_civil_liberties', label: 'causes' },
  { source: 'future_id_fraud_risk', target: 'crime_social', label: 'causes' },
  { source: 'future_id_fraud_risk', target: 'cost_of_living', label: 'causes' },
  { source: 'future_uk_tech_exodus', target: 'low_growth', label: 'causes' },
  { source: 'future_uk_tech_exodus', target: 'low_investment', label: 'causes' },
  { source: 'future_uk_tech_exodus', target: 'low_productivity', label: 'causes' },
  { source: 'future_censorship_creep', target: 'future_civil_liberties', label: 'causes' },
  { source: 'future_censorship_creep', target: 'democratic_deficit', label: 'causes' },
  { source: 'future_surveillance_normalisation', target: 'future_civil_liberties', label: 'causes' },
  { source: 'future_surveillance_normalisation', target: 'democratic_deficit', label: 'causes' },
  { source: 'future_surveillance_normalisation', target: 'future_uk_tech_exodus', label: 'causes' },

  // ════════════════════════════════════════════════
  //  STRUCTURAL FUTURE PROBLEM CAUSAL CHAINS
  // ════════════════════════════════════════════════

  // AI & Automation
  { source: 'future_ai_displacement', target: 'wage_stagnation', label: 'causes' },
  { source: 'future_ai_displacement', target: 'inequality', label: 'causes' },
  { source: 'future_ai_displacement', target: 'mental_health_crisis', label: 'causes' },
  { source: 'future_ai_displacement', target: 'future_social_fragmentation', label: 'causes' },
  { source: 'future_ai_displacement', target: 'future_ai_inequality', label: 'causes' },
  { source: 'future_ai_governance', target: 'future_ai_inequality', label: 'causes' },
  { source: 'future_ai_governance', target: 'future_disinformation', label: 'causes' },
  { source: 'future_disinformation', target: 'future_social_fragmentation', label: 'causes' },
  { source: 'future_disinformation', target: 'crime_social', label: 'causes' },

  // Climate
  { source: 'climate_challenge', target: 'future_weather_extremes', label: 'causes' },
  { source: 'climate_challenge', target: 'future_sea_level_rise', label: 'causes' },
  { source: 'climate_challenge', target: 'future_water_scarcity', label: 'causes' },
  { source: 'climate_challenge', target: 'future_climate_migration', label: 'causes' },
  { source: 'future_weather_extremes', target: 'cost_of_living', label: 'causes' },
  { source: 'future_weather_extremes', target: 'poor_infrastructure', label: 'causes' },
  { source: 'future_weather_extremes', target: 'food_inflation', label: 'causes' },
  { source: 'future_sea_level_rise', target: 'housing_unaffordable', label: 'causes' },
  { source: 'future_sea_level_rise', target: 'inequality', label: 'causes' },
  { source: 'future_water_scarcity', target: 'cost_of_living', label: 'causes' },
  { source: 'future_water_scarcity', target: 'food_inflation', label: 'causes' },
  { source: 'population_pressure', target: 'future_water_scarcity', label: 'causes' },
  { source: 'future_climate_migration', target: 'population_pressure', label: 'causes' },
  { source: 'future_climate_migration', target: 'housing_unaffordable', label: 'causes' },

  // Demographics
  { source: 'housing_unaffordable', target: 'future_birthrate_decline', label: 'causes' },
  { source: 'cost_of_living', target: 'future_birthrate_decline', label: 'causes' },
  { source: 'wage_stagnation', target: 'future_birthrate_decline', label: 'causes' },
  { source: 'future_birthrate_decline', target: 'future_aging_population', label: 'causes' },
  { source: 'future_aging_population', target: 'nhs_crisis', label: 'causes' },
  { source: 'future_aging_population', target: 'social_care_failure', label: 'causes' },
  { source: 'future_aging_population', target: 'future_pension_crisis', label: 'causes' },
  { source: 'future_aging_population', target: 'future_workforce_shortage', label: 'causes' },
  { source: 'future_birthrate_decline', target: 'future_workforce_shortage', label: 'causes' },
  { source: 'future_workforce_shortage', target: 'low_growth', label: 'causes' },
  { source: 'future_workforce_shortage', target: 'nhs_crisis', label: 'causes' },
  { source: 'future_workforce_shortage', target: 'tax_burden', label: 'causes' },
  { source: 'future_pension_crisis', target: 'cost_of_living', label: 'causes' },
  { source: 'future_pension_crisis', target: 'poverty_deprivation', label: 'causes' },
  { source: 'future_pension_crisis', target: 'tax_burden', label: 'causes' },

  // Childcare collapse
  { source: 'future_childcare_collapse', target: 'childcare_costs', label: 'causes' },
  { source: 'future_childcare_collapse', target: 'childcare_supply_shortage', label: 'causes' },
  { source: 'future_childcare_collapse', target: 'future_birthrate_decline', label: 'causes' },
  { source: 'future_childcare_collapse', target: 'maternal_employment_penalty', label: 'causes' },
  { source: 'future_gender_inequality_entrenchment', target: 'poverty_deprivation', label: 'causes' },
  { source: 'future_gender_inequality_entrenchment', target: 'future_pension_crisis', label: 'causes' },

  // Health
  { source: 'future_antibiotic_resistance', target: 'nhs_crisis', label: 'causes' },

  // Social
  { source: 'mental_health_crisis', target: 'future_social_fragmentation', label: 'causes' },
  { source: 'inequality', target: 'future_social_fragmentation', label: 'causes' },
  { source: 'poverty_deprivation', target: 'future_social_fragmentation', label: 'causes' },
  { source: 'future_social_fragmentation', target: 'crime_social', label: 'causes' },
  { source: 'future_social_fragmentation', target: 'mental_health_crisis', label: 'causes' },

  // ════════════════════════════════════════════════
  //  SOLUTIONS FOR FUTURE PROBLEMS
  // ════════════════════════════════════════════════
  { source: 'sol_ai_regulation', target: 'future_ai_governance', label: 'solves' },
  { source: 'sol_ai_regulation', target: 'future_disinformation', label: 'solves' },
  { source: 'sol_ai_regulation', target: 'future_ai_inequality', label: 'solves' },
  { source: 'sol_ai_transition', target: 'future_ai_displacement', label: 'solves' },
  { source: 'sol_ai_transition', target: 'future_ai_inequality', label: 'solves' },
  { source: 'sol_flood_defences', target: 'future_weather_extremes', label: 'solves' },
  { source: 'sol_flood_defences', target: 'future_sea_level_rise', label: 'solves' },
  { source: 'sol_coastal_adaptation', target: 'future_sea_level_rise', label: 'solves' },
  { source: 'sol_water_infrastructure', target: 'future_water_scarcity', label: 'solves' },
  { source: 'sol_pronatalist', target: 'future_birthrate_decline', label: 'solves' },
  { source: 'sol_pronatalist', target: 'future_aging_population', label: 'solves' },
  { source: 'sol_universal_childcare', target: 'future_childcare_collapse', label: 'solves' },
  { source: 'sol_universal_childcare', target: 'future_gender_inequality_entrenchment', label: 'solves' },
  { source: 'sol_childcare_workforce_pay', target: 'future_childcare_collapse', label: 'solves' },
  { source: 'sol_managed_migration', target: 'future_workforce_shortage', label: 'solves' },
  { source: 'sol_managed_migration', target: 'future_labour_shortages', label: 'solves' },
  { source: 'sol_media_literacy', target: 'future_disinformation', label: 'solves' },
  { source: 'sol_media_literacy', target: 'future_social_fragmentation', label: 'solves' },

  // Digital rights & privacy solutions
  { source: 'sol_encryption_protection', target: 'future_encryption_weakening', label: 'solves' },
  { source: 'sol_encryption_protection', target: 'future_surveillance_normalisation', label: 'solves' },
  { source: 'sol_digital_rights_bill', target: 'future_surveillance_normalisation', label: 'solves' },
  { source: 'sol_digital_rights_bill', target: 'future_civil_liberties', label: 'solves' },
  { source: 'sol_digital_rights_bill', target: 'future_censorship_creep', label: 'solves' },
  { source: 'sol_digital_rights_bill', target: 'future_id_fraud_risk', label: 'solves' },
  { source: 'sol_osa_reform', target: 'future_encryption_weakening', label: 'solves' },
  { source: 'sol_osa_reform', target: 'future_id_fraud_risk', label: 'solves' },
  { source: 'sol_osa_reform', target: 'future_uk_tech_exodus', label: 'solves' },
  { source: 'sol_osa_reform', target: 'future_censorship_creep', label: 'solves' },

  // ════════════════════════════════════════════════
  //  ADDITIONAL CLUSTERS: UNDEREXPLORED ISSUES
  // ════════════════════════════════════════════════

  // --- Loneliness Epidemic ---
  { source: 'loneliness_epidemic', target: 'mental_health_crisis', label: 'causes' },
  { source: 'loneliness_epidemic', target: 'nhs_crisis', label: 'causes' },
  { source: 'loneliness_epidemic', target: 'future_aging_population', label: 'causes' },
  { source: 'sol_social_infrastructure', target: 'loneliness_epidemic', label: 'solves' },
  { source: 'sol_social_prescribing', target: 'loneliness_epidemic', label: 'solves' },
  { source: 'sol_social_prescribing', target: 'mental_health_crisis', label: 'solves' },

  // --- Water Privatisation Failure ---
  { source: 'water_privatisation', target: 'cost_of_living', label: 'causes' },
  { source: 'water_privatisation', target: 'future_water_scarcity', label: 'causes' },
  { source: 'water_privatisation', target: 'future_water_infrastructure_collapse', label: 'causes' },
  { source: 'sol_water_renationalisation', target: 'water_privatisation', label: 'solves' },
  { source: 'pol_water_special_measures', target: 'sol_water_infrastructure', label: 'implements' },
  { source: 'pol_water_special_measures', target: 'future_water_infrastructure_collapse', label: 'risks' },

  // --- Gig Economy / Insecure Work ---
  { source: 'gig_economy', target: 'wage_stagnation', label: 'causes' },
  { source: 'gig_economy', target: 'mental_health_crisis', label: 'causes' },
  { source: 'gig_economy', target: 'future_pension_crisis', label: 'causes' },
  { source: 'weak_unions', target: 'gig_economy', label: 'causes' },
  { source: 'sol_employment_rights', target: 'gig_economy', label: 'solves' },

  // --- Intergenerational Wealth Gap ---
  { source: 'intergenerational_gap', target: 'housing_unaffordable', label: 'causes' },
  { source: 'intergenerational_gap', target: 'voter_apathy', label: 'causes' },
  { source: 'intergenerational_gap', target: 'future_generational_conflict', label: 'causes' },
  { source: 'financialisation', target: 'intergenerational_gap', label: 'causes' },
  { source: 'austerity', target: 'intergenerational_gap', label: 'causes' },

  // --- Institutional Trust Collapse ---
  { source: 'institutional_trust_collapse', target: 'voter_apathy', label: 'causes' },
  { source: 'institutional_trust_collapse', target: 'democratic_deficit', label: 'causes' },
  { source: 'political_disconnect', target: 'institutional_trust_collapse', label: 'causes' },
  { source: 'media_concentration', target: 'institutional_trust_collapse', label: 'causes' },

  // --- Soil Degradation & Food Security ---
  { source: 'soil_degradation', target: 'food_insecurity', label: 'causes' },
  { source: 'food_insecurity', target: 'cost_of_living', label: 'causes' },
  { source: 'food_insecurity', target: 'nhs_crisis', label: 'causes' },
  { source: 'brexit_impact', target: 'food_insecurity', label: 'causes' },
  { source: 'sol_food_sovereignty', target: 'food_insecurity', label: 'solves' },
  { source: 'sol_regenerative_agriculture', target: 'soil_degradation', label: 'solves' },

  // --- Land Value Tax ---
  { source: 'sol_land_value_tax', target: 'land_banking', label: 'solves' },
  { source: 'sol_land_value_tax', target: 'financialisation', label: 'solves' },
  { source: 'sol_land_value_tax', target: 'housing_unaffordable', label: 'solves' },

  // --- Universal Basic Income ---
  { source: 'sol_ubi', target: 'gig_economy', label: 'solves' },
  { source: 'sol_ubi', target: 'cost_of_living', label: 'solves' },
  { source: 'sol_ubi', target: 'future_ai_displacement', label: 'solves' },
  { source: 'sol_ubi', target: 'food_insecurity', label: 'solves' },

  // --- Four-Day Work Week ---
  { source: 'sol_four_day_week', target: 'low_productivity', label: 'solves' },
  { source: 'sol_four_day_week', target: 'mental_health_crisis', label: 'solves' },
  { source: 'sol_four_day_week', target: 'childcare_costs', label: 'solves' },

  // --- Citizens' Assemblies ---
  { source: 'sol_citizens_assemblies', target: 'institutional_trust_collapse', label: 'solves' },
  { source: 'sol_citizens_assemblies', target: 'voter_apathy', label: 'solves' },
  { source: 'sol_citizens_assemblies', target: 'democratic_deficit', label: 'solves' },

  // --- Community Wealth Building ---
  { source: 'sol_community_wealth', target: 'london_centrism', label: 'solves' },
  { source: 'sol_community_wealth', target: 'inequality', label: 'solves' },
  { source: 'sol_community_wealth', target: 'low_investment', label: 'solves' },

  // --- Obesity & Ultra-Processed Food ---
  { source: 'obesity_upf_crisis', target: 'nhs_crisis', label: 'causes' },
  { source: 'obesity_upf_crisis', target: 'mental_health_crisis', label: 'causes' },
  { source: 'food_insecurity', target: 'obesity_upf_crisis', label: 'causes' },
  { source: 'sol_upf_regulation', target: 'obesity_upf_crisis', label: 'solves' },

  // --- Gambling Harm ---
  { source: 'gambling_harm', target: 'mental_health_crisis', label: 'causes' },
  { source: 'gambling_harm', target: 'poverty_deprivation', label: 'causes' },
  { source: 'gambling_harm', target: 'crime_social', label: 'causes' },
  { source: 'sol_gambling_reform', target: 'gambling_harm', label: 'solves' },

  // --- Air Pollution ---
  { source: 'air_pollution', target: 'nhs_crisis', label: 'causes' },
  { source: 'air_pollution', target: 'climate_challenge', label: 'causes' },
  { source: 'sol_clean_air', target: 'air_pollution', label: 'solves' },

  // --- Biodiversity Loss ---
  { source: 'biodiversity_loss', target: 'food_insecurity', label: 'causes' },
  { source: 'biodiversity_loss', target: 'climate_challenge', label: 'causes' },
  { source: 'soil_degradation', target: 'biodiversity_loss', label: 'causes' },
  { source: 'sol_nature_restoration', target: 'biodiversity_loss', label: 'solves' },

  // --- Local Government Funding Crisis ---
  { source: 'austerity', target: 'local_govt_crisis', label: 'causes' },
  { source: 'local_govt_crisis', target: 'inequality', label: 'causes' },
  { source: 'local_govt_crisis', target: 'future_council_collapse', label: 'causes' },
  { source: 'local_govt_crisis', target: 'education_crisis', label: 'causes' },
  { source: 'sol_local_funding_reform', target: 'local_govt_crisis', label: 'solves' },

  // --- SEND Crisis ---
  { source: 'send_crisis', target: 'local_govt_crisis', label: 'causes' },
  { source: 'send_crisis', target: 'education_crisis', label: 'causes' },
  { source: 'send_crisis', target: 'mental_health_crisis', label: 'causes' },
  { source: 'school_funding_squeeze', target: 'send_crisis', label: 'causes' },
  { source: 'sol_send_reform', target: 'send_crisis', label: 'solves' },

  // --- Unpaid Care Economy ---
  { source: 'social_care_failure', target: 'unpaid_care_crisis', label: 'causes' },
  { source: 'unpaid_care_crisis', target: 'mental_health_crisis', label: 'causes' },
  { source: 'unpaid_care_crisis', target: 'future_gender_inequality_entrenchment', label: 'causes' },
  { source: 'unpaid_care_crisis', target: 'wage_stagnation', label: 'causes' },
  { source: 'sol_carer_support', target: 'unpaid_care_crisis', label: 'solves' },

  // --- Corporate Tax Avoidance ---
  { source: 'corporate_tax_avoidance', target: 'austerity', label: 'causes' },
  { source: 'corporate_tax_avoidance', target: 'inequality', label: 'causes' },
  { source: 'corporate_tax_avoidance', target: 'local_govt_crisis', label: 'causes' },
  { source: 'lobbying_influence', target: 'corporate_tax_avoidance', label: 'causes' },
  { source: 'sol_tax_reform', target: 'corporate_tax_avoidance', label: 'solves' },

  // --- Preventive Healthcare ---
  { source: 'sol_preventive_health', target: 'nhs_crisis', label: 'solves' },
  { source: 'sol_preventive_health', target: 'obesity_upf_crisis', label: 'solves' },
  { source: 'sol_preventive_health', target: 'mental_health_crisis', label: 'solves' },

  // --- Wealth Tax ---
  { source: 'sol_wealth_tax', target: 'intergenerational_gap', label: 'solves' },
  { source: 'sol_wealth_tax', target: 'inequality', label: 'solves' },
  { source: 'sol_wealth_tax', target: 'austerity', label: 'solves' },

  // --- Right to Repair ---
  { source: 'sol_right_to_repair', target: 'cost_of_living', label: 'solves' },
  { source: 'sol_right_to_repair', target: 'climate_challenge', label: 'solves' },

  // --- Social Mobility Decline ---
  { source: 'attainment_gap', target: 'social_mobility_decline', label: 'causes' },
  { source: 'inequality', target: 'social_mobility_decline', label: 'causes' },
  { source: 'social_mobility_decline', target: 'voter_apathy', label: 'causes' },
  { source: 'social_mobility_decline', target: 'crime_social', label: 'causes' },

  // --- Third Sector Collapse ---
  { source: 'local_govt_crisis', target: 'future_third_sector_collapse', label: 'causes' },
  { source: 'austerity', target: 'future_third_sector_collapse', label: 'causes' },
  { source: 'future_third_sector_collapse', target: 'loneliness_epidemic', label: 'causes' },
  { source: 'future_third_sector_collapse', target: 'mental_health_crisis', label: 'causes' },

  // ── Round 2 topic cluster edges ─────────────────

  // --- Homelessness Crisis ---
  { source: 'housing_unaffordable', target: 'homelessness', label: 'causes' },
  { source: 'high_rents', target: 'homelessness', label: 'causes' },
  { source: 'mental_health_crisis', target: 'homelessness', label: 'causes' },
  { source: 'austerity', target: 'homelessness', label: 'causes' },
  { source: 'homelessness', target: 'nhs_crisis', label: 'causes' },
  { source: 'homelessness', target: 'crime_social', label: 'causes' },
  { source: 'sol_homelessness_prevention', target: 'homelessness', label: 'solves' },
  { source: 'sol_social_housing', target: 'homelessness', label: 'solves' },

  // --- Leasehold Trap ---
  { source: 'leasehold_trap', target: 'housing_unaffordable', label: 'causes' },
  { source: 'leasehold_trap', target: 'cost_of_living', label: 'causes' },
  { source: 'financialisation', target: 'leasehold_trap', label: 'causes' },
  { source: 'sol_leasehold_reform', target: 'leasehold_trap', label: 'solves' },

  // --- Brain Drain ---
  { source: 'cost_of_living', target: 'brain_drain', label: 'causes' },
  { source: 'wage_stagnation', target: 'brain_drain', label: 'causes' },
  { source: 'brain_drain', target: 'staff_shortages', label: 'causes' },
  { source: 'brain_drain', target: 'low_productivity', label: 'causes' },
  { source: 'brain_drain', target: 'future_talent_exodus', label: 'causes' },
  { source: 'sol_wage_policy', target: 'brain_drain', label: 'solves' },

  // --- Student Debt Burden ---
  { source: 'student_debt', target: 'intergenerational_gap', label: 'causes' },
  { source: 'student_debt', target: 'housing_unaffordable', label: 'causes' },
  { source: 'student_debt', target: 'future_birthrate_decline', label: 'causes' },
  { source: 'student_debt', target: 'social_mobility_decline', label: 'causes' },
  { source: 'sol_higher_ed_reform', target: 'student_debt', label: 'solves' },

  // --- Infrastructure Maintenance Backlog ---
  { source: 'austerity', target: 'infrastructure_backlog', label: 'causes' },
  { source: 'infrastructure_backlog', target: 'nhs_crisis', label: 'causes' },
  { source: 'infrastructure_backlog', target: 'education_crisis', label: 'causes' },
  { source: 'infrastructure_backlog', target: 'inequality', label: 'causes' },
  { source: 'infrastructure_backlog', target: 'poor_infrastructure', label: 'causes' },
  { source: 'sol_infrastructure_investment', target: 'infrastructure_backlog', label: 'solves' },

  // --- Domestic Abuse ---
  { source: 'domestic_abuse', target: 'homelessness', label: 'causes' },
  { source: 'domestic_abuse', target: 'mental_health_crisis', label: 'causes' },
  { source: 'domestic_abuse', target: 'crime_social', label: 'causes' },
  { source: 'poverty_deprivation', target: 'domestic_abuse', label: 'causes' },
  { source: 'sol_domestic_abuse_funding', target: 'domestic_abuse', label: 'solves' },

  // --- Digital Divide ---
  { source: 'digital_divide', target: 'loneliness_epidemic', label: 'causes' },
  { source: 'digital_divide', target: 'inequality', label: 'causes' },
  { source: 'digital_divide', target: 'nhs_crisis', label: 'causes' },
  { source: 'future_aging_population', target: 'digital_divide', label: 'causes' },
  { source: 'sol_digital_inclusion', target: 'digital_divide', label: 'solves' },

  // --- Triple Lock Unsustainability ---
  { source: 'triple_lock_unsustainable', target: 'future_pension_crisis', label: 'causes' },
  { source: 'triple_lock_unsustainable', target: 'intergenerational_gap', label: 'causes' },
  { source: 'triple_lock_unsustainable', target: 'tax_burden', label: 'causes' },
  { source: 'future_aging_population', target: 'triple_lock_unsustainable', label: 'causes' },
  { source: 'future_birthrate_decline', target: 'triple_lock_unsustainable', label: 'causes' },
  { source: 'triple_lock_unsustainable', target: 'future_pension_age_rise', label: 'causes' },

  // ── Child Abuse & Safeguarding edges ──
  { source: 'child_abuse_crisis', target: 'mental_health_crisis', label: 'causes' },
  { source: 'child_abuse_crisis', target: 'crime_social', label: 'causes' },
  { source: 'child_abuse_crisis', target: 'homelessness', label: 'causes' },
  { source: 'child_abuse_crisis', target: 'children_in_care', label: 'causes' },
  { source: 'poverty_deprivation', target: 'child_abuse_crisis', label: 'causes' },
  { source: 'social_worker_shortage', target: 'child_abuse_crisis', label: 'causes' },
  { source: 'austerity', target: 'social_worker_shortage', label: 'causes' },
  { source: 'local_govt_crisis', target: 'social_worker_shortage', label: 'causes' },
  { source: 'child_exploitation', target: 'child_abuse_crisis', label: 'causes' },
  { source: 'policing_cuts', target: 'child_exploitation', label: 'causes' },
  { source: 'poverty_deprivation', target: 'child_exploitation', label: 'causes' },
  { source: 'children_in_care', target: 'child_exploitation', label: 'causes' },
  { source: 'children_in_care', target: 'homelessness', label: 'causes' },
  { source: 'children_in_care', target: 'mental_health_crisis', label: 'causes' },
  { source: 'children_in_care', target: 'social_mobility_decline', label: 'causes' },
  { source: 'local_govt_crisis', target: 'children_in_care', label: 'causes' },
  { source: 'sol_child_safeguarding', target: 'child_abuse_crisis', label: 'solves' },
  { source: 'sol_child_safeguarding', target: 'children_in_care', label: 'solves' },
  { source: 'sol_child_safeguarding', target: 'social_worker_shortage', label: 'solves' },
  { source: 'sol_online_child_protection', target: 'child_exploitation', label: 'solves' },
  { source: 'pol_online_safety_act', target: 'sol_online_child_protection', label: 'implements' },

  // ── Youth Mental Health edges ──
  { source: 'youth_mental_health', target: 'mental_health_crisis', label: 'causes' },
  { source: 'youth_mental_health', target: 'education_crisis', label: 'causes' },
  { source: 'youth_mental_health', target: 'attainment_gap', label: 'causes' },
  { source: 'youth_mental_health', target: 'knife_crime', label: 'causes' },
  { source: 'poverty_deprivation', target: 'youth_mental_health', label: 'causes' },
  { source: 'child_abuse_crisis', target: 'youth_mental_health', label: 'causes' },
  { source: 'nhs_underfunding', target: 'youth_mental_health', label: 'causes' },
  { source: 'school_funding_squeeze', target: 'youth_mental_health', label: 'causes' },
  { source: 'youth_mental_health', target: 'future_social_media_harm', label: 'causes' },
  { source: 'sol_youth_mental_health', target: 'youth_mental_health', label: 'solves' },
  { source: 'sol_youth_mental_health', target: 'future_social_media_harm', label: 'solves' },

  // ── Community Cohesion & Immigration edges ──
  { source: 'population_pressure', target: 'community_cohesion', label: 'causes' },
  { source: 'asylum_system_failure', target: 'community_cohesion', label: 'causes' },
  { source: 'austerity', target: 'community_cohesion', label: 'causes' },
  { source: 'community_cohesion', target: 'political_disconnect', label: 'causes' },
  { source: 'community_cohesion', target: 'crime_social', label: 'causes' },
  { source: 'community_cohesion', target: 'voter_apathy', label: 'causes' },
  { source: 'centralised_governance', target: 'asylum_system_failure', label: 'causes' },
  { source: 'asylum_system_failure', target: 'political_disconnect', label: 'causes' },
  { source: 'asylum_system_failure', target: 'cost_of_living', label: 'causes' },
  { source: 'sol_integration_strategy', target: 'community_cohesion', label: 'solves' },
  { source: 'sol_integration_strategy', target: 'asylum_system_failure', label: 'solves' },
  { source: 'pol_immigration_wp', target: 'sol_integration_strategy', label: 'implements' },

  // ── Knife Crime edges ──
  { source: 'knife_crime', target: 'crime_social', label: 'causes' },
  { source: 'poverty_deprivation', target: 'knife_crime', label: 'causes' },
  { source: 'policing_cuts', target: 'knife_crime', label: 'causes' },
  { source: 'youth_service_cuts', target: 'knife_crime', label: 'causes' },
  { source: 'child_exploitation', target: 'knife_crime', label: 'causes' },
  { source: 'sol_violence_reduction', target: 'knife_crime', label: 'solves' },
  { source: 'pol_crime_bill', target: 'sol_violence_reduction', label: 'implements' },

  // ── Defence edges ──
  { source: 'austerity', target: 'defence_underfunding', label: 'causes' },
  { source: 'low_growth', target: 'defence_underfunding', label: 'causes' },
  { source: 'defence_underfunding', target: 'future_security_vacuum', label: 'causes' },
  { source: 'brexit_impact', target: 'defence_underfunding', label: 'causes' },
  { source: 'sol_defence_investment', target: 'defence_underfunding', label: 'solves' },
  { source: 'sol_defence_investment', target: 'future_security_vacuum', label: 'solves' },

  // ── Brexit sovereignty edges ──
  { source: 'brexit_impact', target: 'brexit_sovereignty', label: 'causes' },
  { source: 'brexit_sovereignty', target: 'sol_trade_diversification', label: 'causes' },
];

// ════════════════════════════════════════════════
//  THEMATIC GROUPS
// ════════════════════════════════════════════════
export const groups = [
  { id: 'grp_housing', label: '🏠 Housing', color: '#e74c3c' },
  { id: 'grp_health', label: '🏥 Health & Care', color: '#9b59b6' },
  { id: 'grp_economy', label: '💷 Economy & Growth', color: '#f39c12' },
  { id: 'grp_energy', label: '⚡ Energy & Climate', color: '#1abc9c' },
  { id: 'grp_regional', label: '🗺️ Regional & Governance', color: '#e67e22' },
  { id: 'grp_education', label: '📚 Education & Skills', color: '#3498db' },
  { id: 'grp_crime', label: '🔒 Crime & Society', color: '#c0392b' },
  { id: 'grp_costliving', label: '💰 Cost of Living', color: '#f1c40f' },
  { id: 'grp_democracy', label: '🗳️ Democracy', color: '#e056a0' },
  { id: 'grp_digital', label: '🔐 Digital Rights & Privacy', color: '#00bcd4' },
  { id: 'grp_food', label: '🍽️ Food & Public Health', color: '#e88a1a' },
  { id: 'grp_social', label: '🤝 Social Fabric', color: '#8e6cc2' },
  { id: 'grp_local', label: '🏛️ Local Government', color: '#d4795c' },
  { id: 'grp_children', label: '👶 Children & Safeguarding', color: '#ff6b9d' },
  { id: 'grp_defence', label: '🛡️ Defence & Security', color: '#607d8b' },
];

export const nodeGroups = {
  // Housing
  housing_unaffordable: 'grp_housing',
  housing_supply: 'grp_housing',
  high_rents: 'grp_housing',
  financialisation: 'grp_housing',
  planning_system: 'grp_housing',
  land_banking: 'grp_housing',
  sol_planning_reform: 'grp_housing',
  sol_social_housing: 'grp_housing',
  sol_rent_controls: 'grp_housing',
  pol_planning_bill: 'grp_housing',
  future_green_belt_loss: 'grp_housing',
  future_community_backlash: 'grp_housing',

  // Health & Care
  nhs_crisis: 'grp_health',
  nhs_underfunding: 'grp_health',
  staff_shortages: 'grp_health',
  social_care_failure: 'grp_health',
  mental_health_crisis: 'grp_health',
  sol_nhs_funding: 'grp_health',
  sol_social_care_reform: 'grp_health',
  sol_train_staff: 'grp_health',
  sol_mental_health: 'grp_health',
  pol_nhs_10yr: 'grp_health',
  future_digital_exclusion: 'grp_health',
  future_privatisation_creep: 'grp_health',
  future_nhs_recruitment_crisis: 'grp_health',

  // Economy & Growth
  low_growth: 'grp_economy',
  low_productivity: 'grp_economy',
  low_investment: 'grp_economy',
  wage_stagnation: 'grp_economy',
  tax_burden: 'grp_economy',
  short_termism: 'grp_economy',
  brexit_impact: 'grp_economy',
  weak_unions: 'grp_economy',
  austerity: 'grp_economy',
  sol_industrial_strategy: 'grp_economy',
  sol_trade_alignment: 'grp_economy',
  sol_wage_policy: 'grp_economy',
  pol_national_wealth_fund: 'grp_economy',
  future_misallocation: 'grp_economy',
  future_ai_displacement: 'grp_economy',
  future_ai_inequality: 'grp_economy',
  future_ai_governance: 'grp_economy',
  sol_ai_regulation: 'grp_economy',
  sol_ai_transition: 'grp_economy',

  // Energy & Climate
  climate_challenge: 'grp_energy',
  high_energy_prices: 'grp_energy',
  gas_dependency: 'grp_energy',
  global_energy_shocks: 'grp_energy',
  grid_constraints: 'grp_energy',
  green_skills_gap: 'grp_energy',
  sol_renewables: 'grp_energy',
  sol_insulation: 'grp_energy',
  sol_grid_upgrade: 'grp_energy',
  pol_gb_energy: 'grp_energy',
  pol_clean_power_2030: 'grp_energy',
  future_transition_costs: 'grp_energy',
  future_fossil_job_losses: 'grp_energy',
  future_weather_extremes: 'grp_energy',
  future_water_scarcity: 'grp_energy',
  future_sea_level_rise: 'grp_energy',
  future_climate_migration: 'grp_energy',
  sol_flood_defences: 'grp_energy',
  sol_coastal_adaptation: 'grp_energy',
  sol_water_infrastructure: 'grp_energy',

  // Regional & Governance
  inequality: 'grp_regional',
  london_centrism: 'grp_regional',
  uneven_devolution: 'grp_regional',
  centralised_governance: 'grp_regional',
  poor_infrastructure: 'grp_regional',
  sol_devolution: 'grp_regional',
  sol_transport_investment: 'grp_regional',
  pol_devolution_deals: 'grp_regional',
  future_postcode_lottery: 'grp_regional',

  // Education & Skills
  education_crisis: 'grp_education',
  school_funding_squeeze: 'grp_education',
  skills_mismatch: 'grp_education',
  attainment_gap: 'grp_education',
  training_failures: 'grp_education',
  sol_skills_investment: 'grp_education',
  sol_school_funding: 'grp_education',
  pol_skills_england: 'grp_education',

  // Crime & Society
  crime_social: 'grp_crime',
  policing_cuts: 'grp_crime',
  youth_service_cuts: 'grp_crime',
  prison_overcrowding: 'grp_crime',
  poverty_deprivation: 'grp_crime',
  sol_drug_reform: 'grp_crime',
  sol_prison_reform: 'grp_crime',
  pol_crime_bill: 'grp_crime',
  future_civil_liberties: 'grp_crime',
  future_social_fragmentation: 'grp_crime',
  future_disinformation: 'grp_crime',
  sol_media_literacy: 'grp_crime',

  // Cost of Living
  cost_of_living: 'grp_costliving',
  food_inflation: 'grp_costliving',

  // Childcare
  childcare_costs: 'grp_costliving',
  childcare_supply_shortage: 'grp_costliving',
  childcare_workforce_crisis: 'grp_costliving',
  inadequate_parental_leave: 'grp_costliving',
  maternal_employment_penalty: 'grp_costliving',
  sol_universal_childcare: 'grp_costliving',
  sol_childcare_workforce_pay: 'grp_costliving',
  sol_parental_leave_reform: 'grp_costliving',
  sol_flexible_working: 'grp_costliving',
  pol_childcare_expansion: 'grp_costliving',
  future_childcare_collapse: 'grp_costliving',
  future_gender_inequality_entrenchment: 'grp_costliving',

  // Demographics (grouped into Cost of Living since small)
  population_pressure: 'grp_costliving',
  pol_immigration_wp: 'grp_costliving',
  future_labour_shortages: 'grp_costliving',
  future_birthrate_decline: 'grp_costliving',
  future_aging_population: 'grp_costliving',
  future_workforce_shortage: 'grp_costliving',
  future_pension_crisis: 'grp_costliving',
  sol_pronatalist: 'grp_costliving',
  sol_managed_migration: 'grp_costliving',

  // Health extras
  future_antibiotic_resistance: 'grp_health',

  // Democracy
  democratic_deficit: 'grp_democracy',
  voter_apathy: 'grp_democracy',
  fptp_system: 'grp_democracy',
  political_disconnect: 'grp_democracy',
  media_concentration: 'grp_democracy',
  demographic_turnout_gap: 'grp_democracy',
  lobbying_influence: 'grp_democracy',
  sol_proportional_representation: 'grp_democracy',
  sol_lobbying_reform: 'grp_democracy',
  sol_civic_education: 'grp_democracy',
  sol_votes_at_16: 'grp_democracy',
  sol_media_plurality: 'grp_democracy',

  // Digital Rights & Privacy
  pol_online_safety_act: 'grp_digital',
  pol_vpn_ip_bill: 'grp_digital',
  future_encryption_weakening: 'grp_digital',
  future_id_fraud_risk: 'grp_digital',
  future_uk_tech_exodus: 'grp_digital',
  future_censorship_creep: 'grp_digital',
  future_surveillance_normalisation: 'grp_digital',
  sol_encryption_protection: 'grp_digital',
  sol_digital_rights_bill: 'grp_digital',
  sol_osa_reform: 'grp_digital',

  // Blind spot additions
  fiscal_drag: 'grp_costliving',
  us_tariffs: 'grp_economy',
  financial_services_erosion: 'grp_economy',
  workforce_immigration_dependency: 'grp_health',
  pol_employer_ni_hike: 'grp_economy',
  pol_frozen_thresholds: 'grp_costliving',
  future_sme_collapse: 'grp_economy',
  future_trade_war_escalation: 'grp_economy',
  future_financial_hub_decline: 'grp_economy',
  future_care_staffing_crisis: 'grp_health',
  sol_threshold_indexation: 'grp_costliving',
  sol_trade_diversification: 'grp_economy',
  sol_eu_financial_alignment: 'grp_economy',
  sol_ni_relief: 'grp_economy',

  // Food & Public Health
  soil_degradation: 'grp_food',
  food_insecurity: 'grp_food',
  sol_food_sovereignty: 'grp_food',
  sol_regenerative_agriculture: 'grp_food',
  obesity_upf_crisis: 'grp_food',
  sol_upf_regulation: 'grp_food',
  gambling_harm: 'grp_food',
  sol_gambling_reform: 'grp_food',

  // Social Fabric
  loneliness_epidemic: 'grp_social',
  sol_social_infrastructure: 'grp_social',
  sol_social_prescribing: 'grp_social',
  intergenerational_gap: 'grp_social',
  future_generational_conflict: 'grp_social',
  sol_ubi: 'grp_social',
  unpaid_care_crisis: 'grp_social',
  sol_carer_support: 'grp_social',

  // Local Government
  local_govt_crisis: 'grp_local',
  future_council_collapse: 'grp_local',
  sol_local_funding_reform: 'grp_local',
  send_crisis: 'grp_local',
  sol_send_reform: 'grp_local',
  future_third_sector_collapse: 'grp_local',

  // Water (Cost of Living)
  water_privatisation: 'grp_costliving',
  sol_water_renationalisation: 'grp_costliving',
  pol_water_special_measures: 'grp_costliving',
  future_water_infrastructure_collapse: 'grp_costliving',

  // Economy additions
  gig_economy: 'grp_economy',
  sol_employment_rights: 'grp_economy',
  sol_four_day_week: 'grp_economy',
  corporate_tax_avoidance: 'grp_economy',
  sol_tax_reform: 'grp_economy',
  sol_wealth_tax: 'grp_economy',

  // Democracy additions
  institutional_trust_collapse: 'grp_democracy',
  sol_citizens_assemblies: 'grp_democracy',

  // Housing additions
  sol_land_value_tax: 'grp_housing',

  // Health additions
  sol_preventive_health: 'grp_health',

  // Energy & Climate additions
  air_pollution: 'grp_energy',
  sol_clean_air: 'grp_energy',
  biodiversity_loss: 'grp_energy',
  sol_nature_restoration: 'grp_energy',
  sol_right_to_repair: 'grp_energy',

  // Regional additions
  sol_community_wealth: 'grp_regional',

  // Education additions
  social_mobility_decline: 'grp_education',

  // Additional clusters — Round 2
  homelessness: 'grp_housing',
  sol_homelessness_prevention: 'grp_housing',
  leasehold_trap: 'grp_housing',
  sol_leasehold_reform: 'grp_housing',
  brain_drain: 'grp_economy',
  future_talent_exodus: 'grp_economy',
  student_debt: 'grp_education',
  sol_higher_ed_reform: 'grp_education',
  infrastructure_backlog: 'grp_regional',
  sol_infrastructure_investment: 'grp_regional',
  domestic_abuse: 'grp_crime',
  sol_domestic_abuse_funding: 'grp_crime',
  digital_divide: 'grp_digital',
  sol_digital_inclusion: 'grp_digital',
  triple_lock_unsustainable: 'grp_economy',
  future_pension_age_rise: 'grp_economy',

  // Children & Safeguarding
  child_abuse_crisis: 'grp_children',
  child_exploitation: 'grp_children',
  children_in_care: 'grp_children',
  social_worker_shortage: 'grp_children',
  sol_child_safeguarding: 'grp_children',
  sol_online_child_protection: 'grp_children',
  youth_mental_health: 'grp_children',
  sol_youth_mental_health: 'grp_children',
  future_social_media_harm: 'grp_children',

  // Crime & Society additions
  knife_crime: 'grp_crime',
  sol_violence_reduction: 'grp_crime',
  community_cohesion: 'grp_crime',
  asylum_system_failure: 'grp_crime',
  sol_integration_strategy: 'grp_crime',

  // Defence & Security
  defence_underfunding: 'grp_defence',
  sol_defence_investment: 'grp_defence',
  future_security_vacuum: 'grp_defence',

  // Economy additions
  brexit_sovereignty: 'grp_economy',
};

// ════════════════════════════════════════════════
//  POLITICAL PARTIES & POLICY POPULARITY
// ════════════════════════════════════════════════

export const parties = [
  { id: 'party_labour', label: 'Labour', color: '#e4003b', abbr: 'Lab' },
  { id: 'party_conservative', label: 'Conservative', color: '#0087dc', abbr: 'Con' },
  { id: 'party_reform', label: 'Reform UK', color: '#12b6cf', abbr: 'Ref' },
  { id: 'party_green', label: 'Green', color: '#6ab023', abbr: 'Grn' },
  { id: 'party_libdem', label: 'Lib Dem', color: '#faa61a', abbr: 'LD' },
];

// 'support' = actively backs, 'oppose' = actively against, 'mixed' = ambivalent/split
export const policyPopularity = {
  pol_planning_bill: {
    party_labour: 'support',
    party_conservative: 'mixed',
    party_reform: 'support',
    party_green: 'oppose',
    party_libdem: 'mixed',
  },
  pol_nhs_10yr: {
    party_labour: 'support',
    party_conservative: 'mixed',
    party_reform: 'oppose',
    party_green: 'support',
    party_libdem: 'support',
  },
  pol_gb_energy: {
    party_labour: 'support',
    party_conservative: 'oppose',
    party_reform: 'oppose',
    party_green: 'support',
    party_libdem: 'support',
  },
  pol_clean_power_2030: {
    party_labour: 'support',
    party_conservative: 'oppose',
    party_reform: 'oppose',
    party_green: 'support',
    party_libdem: 'support',
  },
  pol_immigration_wp: {
    party_labour: 'support',
    party_conservative: 'mixed',
    party_reform: 'oppose',
    party_green: 'oppose',
    party_libdem: 'oppose',
  },
  pol_crime_bill: {
    party_labour: 'support',
    party_conservative: 'support',
    party_reform: 'support',
    party_green: 'oppose',
    party_libdem: 'oppose',
  },
  pol_devolution_deals: {
    party_labour: 'support',
    party_conservative: 'mixed',
    party_reform: 'oppose',
    party_green: 'support',
    party_libdem: 'support',
  },
  pol_national_wealth_fund: {
    party_labour: 'support',
    party_conservative: 'oppose',
    party_reform: 'oppose',
    party_green: 'support',
    party_libdem: 'mixed',
  },
  pol_skills_england: {
    party_labour: 'support',
    party_conservative: 'mixed',
    party_reform: 'mixed',
    party_green: 'support',
    party_libdem: 'support',
  },
  pol_childcare_expansion: {
    party_labour: 'support',
    party_conservative: 'support',
    party_reform: 'mixed',
    party_green: 'support',
    party_libdem: 'support',
  },
  pol_online_safety_act: {
    party_labour: 'support',
    party_conservative: 'support',
    party_reform: 'mixed',
    party_green: 'oppose',
    party_libdem: 'mixed',
  },
  pol_vpn_ip_bill: {
    party_labour: 'support',
    party_conservative: 'mixed',
    party_reform: 'mixed',
    party_green: 'oppose',
    party_libdem: 'oppose',
  },
  pol_employer_ni_hike: {
    party_labour: 'support',
    party_conservative: 'oppose',
    party_reform: 'oppose',
    party_green: 'mixed',
    party_libdem: 'oppose',
  },
  pol_frozen_thresholds: {
    party_labour: 'support',
    party_conservative: 'support',
    party_reform: 'oppose',
    party_green: 'oppose',
    party_libdem: 'oppose',
  },
  pol_water_special_measures: {
    party_labour: 'support',
    party_conservative: 'mixed',
    party_reform: 'mixed',
    party_green: 'oppose',
    party_libdem: 'support',
  },
};
