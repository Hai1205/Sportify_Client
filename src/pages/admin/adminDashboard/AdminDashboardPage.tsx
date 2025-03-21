import { Users, Music, Mic2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TopArtists } from "./components/TopArtists";
import { PopularSongs } from "./components/PopularSongs";
import { useStatStore } from "@/stores/useStatStore";
import { useEffect } from "react";

export default function AdminDashboardPage() {
  const { generalStat, getGeneralStat } = useStatStore();

  useEffect(() => {
    getGeneralStat();
  }, [getGeneralStat]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>

            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">{generalStat.totalUsers}</div>

            {/* <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Albums
            </CardTitle>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">{generalStat.totalAlbums}</div>

            {/* <p className="text-xs text-muted-foreground">
              +8.2% from last month
            </p> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Songs</CardTitle>

            <Music className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">{generalStat.totalSongs}</div>

            {/* <p className="text-xs text-muted-foreground">
              +24.3% from last month
            </p> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Artists</CardTitle>

            <Mic2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">{generalStat.totalArtists}</div>

            {/* <p className="text-xs text-muted-foreground">
              +10.1% from last month
            </p> */}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Popular Songs</CardTitle>

                <CardDescription>
                  Top 5 most streamed songs this week
                </CardDescription>
              </CardHeader>

              <CardContent>
                <PopularSongs />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Artists</CardTitle>

                <CardDescription>
                  Most followed artists this month
                </CardDescription>
              </CardHeader>

              <CardContent>
                <TopArtists />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
