import { getMiMeetProgram } from "@/lib/data";
import MiMeetProgramClient from "./client";

export const dynamic = "force-dynamic";

export default async function MiMeetProgramPage() {
  const program = await getMiMeetProgram();
  return <MiMeetProgramClient program={program} />;
}
