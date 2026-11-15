import { profiles } from "../../../portfolio.config";
import { socialImage } from "../../lib/social";
export function getStaticPaths() {
  return Object.entries(profiles).map(([profession, p]) => ({
    params: { profession },
    props: { p },
  }));
}
export const GET = ({ props }: { props: { p: (typeof profiles)["developer"] } }) => socialImage(props.p);
