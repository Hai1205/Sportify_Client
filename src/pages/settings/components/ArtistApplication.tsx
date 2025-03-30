import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import LoadingSpinner from "@/components/ui/loading";

interface SongSample {
  title: string;
  file?: File | null;
}

interface ArtistApplicationProps {
  applicationData: {
    achievements: string;
    reason: string;
  };
  songData: SongSample[];
  handleApplicationChange: (name: string, value: string | File | null) => void;
  handleRequireApplication: () => void;
  isUserLoading: boolean;
}

const ArtistApplication = ({
  applicationData,
  songData,
  handleApplicationChange,
  handleRequireApplication,
  isUserLoading,
}: ArtistApplicationProps) => {
  const [songs, setSongs] = useState<SongSample[]>(songData);

  const updateSongTitle = (index: number, title: string) => {
    const updatedSongs = [...songs];
    updatedSongs[index].title = title;
    setSongs(updatedSongs);
  };

  return (
    <TabsContent value="application">
      <Card>
        <CardHeader>
          <CardTitle>Artist Application</CardTitle>
          <CardDescription>
            Apply to become a verified artist on Spotify
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <ScrollArea className="h-[255px] w-full">
            <div className="grid gap-4">
              <div className="space-y-1">
                <Label htmlFor="achievements">Notable Achievements</Label>
                <Textarea
                  id="achievements"
                  name="achievements"
                  value={applicationData?.achievements || ""}
                  onChange={(e) => {
                    handleApplicationChange("achievements", e.target.value);
                  }}
                  placeholder="List any notable achievements, performances, or milestones in your music career"
                  rows={3}
                />
              </div>

              {/* Music Samples */}
              <div className="space-y-3">
                <Label>Music Samples</Label>
                <p className="text-sm text-muted-foreground">
                  Upload at least 3 music samples that represent your work
                </p>
                {songs.map((song, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Song {index + 1}</h4>
                      <Badge>Required</Badge>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`song${index + 1}-title`}>
                        Song Title
                      </Label>
                      <Input
                        id={`song${index + 1}-title`}
                        name={`song${index + 1}Title`}
                        value={song.title}
                        onChange={(e) => {
                          updateSongTitle(index, e.target.value);
                        }}
                        placeholder="Enter song title"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`song${index + 1}-file`}>
                        Audio File
                      </Label>
                      <Input
                        id={`song${index + 1}-file`}
                        name={`song${index + 1}File`}
                        type="file"
                        accept="audio/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          handleApplicationChange(`song${index + 1}File`, file);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <Label htmlFor="application-reason">
                  Why do you want to become a verified artist?
                </Label>
                <Textarea
                  id="application-reason"
                  name="reason"
                  value={applicationData?.reason || ""}
                  onChange={(e) => {
                    console.log("Reason:", e.target.value);
                    handleApplicationChange("reason", e.target.value);
                  }}
                  placeholder="Explain why you want to become a verified artist and how you plan to use the platform"
                  rows={3}
                />
              </div>
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleRequireApplication}
            disabled={isUserLoading}
            className="gap-1"
          >
            {isUserLoading ? <LoadingSpinner /> : <Save className="h-4 w-4" />}
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default ArtistApplication;
