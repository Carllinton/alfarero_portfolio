import { profiles } from "../../../portfolio.config";
import { resume } from "../../lib/resume";
export function getStaticPaths() {
  return Object.entries(profiles).map(([profession, p]) => ({
    params: { profession },
    props: { p },
  }));
}
export const GET = ({
  props,
}: {
  props: { p: (typeof profiles)["developer"] };
}) => resume(props.p);
