import p from "../../portfolio.config";
import { resume } from "../lib/resume";
export const GET = () => resume(p);
