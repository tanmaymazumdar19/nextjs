import type { NextApiRequest } from 'next'

export interface Product {
  id: number
  progress: string
  item: string
  created_at: string
}

const data: Product[] = [
  {"id":705430,"progress":"draft","item":"instead empty while heart sick","created_at":"2023-12-14T05:36:35.446Z"},
  {"id":676174,"progress":"draft","item":"profuse yahoo um mechanically seemingly","created_at":"2023-12-14T06:51:41.818Z"},
  {"id":603782,"progress":"complete","item":"gadzooks thoughtfully decent cool","created_at":"2023-12-13T23:06:43.798Z"},
  {"id":699673,"progress":"pending","item":"against penny in psst satirize","created_at":"2023-12-13T12:09:27.155Z"},
  {"id":729960,"progress":"complete","item":"yowza stealth closing recompense","created_at":"2023-12-13T23:57:42.658Z"},
  {"id":768108,"progress":"complete","item":"judgementally boohoo boohoo decrease unto","created_at":"2023-12-13T13:51:31.170Z"},
  {"id":374470,"progress":"complete","item":"scholarship gag faraway","created_at":"2023-12-13T19:22:18.156Z"},
  {"id":887813,"progress":"complete","item":"vain wonderfully drowse how","created_at":"2023-12-14T01:27:03.280Z"},
  {"id":801925,"progress":"complete","item":"concerning qua behind","created_at":"2023-12-14T05:21:34.354Z"},
  {"id":422799,"progress":"complete","item":"than wildly kindly over","created_at":"2023-12-14T00:18:37.220Z"},
  {"id":468893,"progress":"pending","item":"persimmon actual overbalance aver","created_at":"2023-12-14T08:29:09.088Z"},
  {"id":532715,"progress":"complete","item":"praise brilliant uh-huh beneath accidentally","created_at":"2023-12-13T11:42:16.561Z"},
  {"id":552676,"progress":"pending","item":"glamorous restring hence","created_at":"2023-12-13T14:58:01.614Z"},
  {"id":548713,"progress":"draft","item":"boo hover authorized eek","created_at":"2023-12-13T11:42:58.806Z"},
  {"id":869803,"progress":"complete","item":"festival incomparable near distorted","created_at":"2023-12-13T17:41:14.710Z"},
  {"id":598375,"progress":"complete","item":"hence splendid yahoo deeply enormously","created_at":"2023-12-14T06:58:07.856Z"},
  {"id":696245,"progress":"pending","item":"willfully beside shrivel um mid","created_at":"2023-12-13T10:44:39.366Z"},
  {"id":909200,"progress":"pending","item":"like meh lime hm","created_at":"2023-12-14T03:48:04.285Z"},
  {"id":626953,"progress":"complete","item":"if fault since immortalise","created_at":"2023-12-13T10:09:32.715Z"},
  {"id":830289,"progress":"draft","item":"sometimes flush television round faithfully","created_at":"2023-12-14T07:50:33.472Z"},
  {"id":467452,"progress":"complete","item":"though amidst anxiously throughout gadzooks","created_at":"2023-12-13T15:16:26.415Z"},
  {"id":634764,"progress":"draft","item":"the woot denim upward","created_at":"2023-12-14T05:58:03.611Z"},
  {"id":704033,"progress":"draft","item":"geez movie easily defrost","created_at":"2023-12-13T09:55:00.822Z"},
  {"id":793403,"progress":"pending","item":"mockingly within inasmuch jovially","created_at":"2023-12-13T10:42:07.513Z"},
  {"id":730335,"progress":"complete","item":"overprint speedily gosh","created_at":"2023-12-13T13:35:21.034Z"},
  {"id":857136,"progress":"complete","item":"hence yellowish given once","created_at":"2023-12-14T01:01:39.261Z"},
  {"id":626165,"progress":"complete","item":"which bench a about","created_at":"2023-12-13T12:12:53.480Z"},
  {"id":588059,"progress":"draft","item":"seizure philosopher amongst yet","created_at":"2023-12-13T15:23:29.783Z"},
  {"id":736282,"progress":"pending","item":"quizzical heavily meh under","created_at":"2023-12-13T11:23:42.210Z"},
  {"id":356356,"progress":"pending","item":"urgently dreamily tankful","created_at":"2023-12-13T12:28:48.813Z"},
  {"id":389410,"progress":"draft","item":"upbeat loan boo openly","created_at":"2023-12-13T16:15:25.112Z"},
  {"id":620583,"progress":"draft","item":"whereas level joshingly honestly","created_at":"2023-12-14T06:27:58.742Z"},
  {"id":881548,"progress":"complete","item":"ah victoriously with","created_at":"2023-12-13T19:05:35.759Z"},
  {"id":878669,"progress":"pending","item":"inferior puzzled incidentally dramatic","created_at":"2023-12-13T11:22:07.079Z"},
  {"id":413451,"progress":"draft","item":"arrest drat at","created_at":"2023-12-14T07:14:45.121Z"},
  {"id":480520,"progress":"draft","item":"gosh finally exploration format provided","created_at":"2023-12-14T06:20:16.667Z"}
]

const limit = 10

export function GET(req: NextApiRequest): Response {
  const { searchParams } = new URL(req.url as string)
  let page
  
  try {
    page = parseInt(searchParams.get('page') ?? '1')
  } catch (err) {
    page = 1
  }
  
  return Response.json({ data: data.slice((page - 1) * limit, page * limit), total: data.length, limit })
}
