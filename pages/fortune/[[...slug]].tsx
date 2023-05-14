import FortuneMain from "../../components/Fortune/FortuneMain";
import { useRouter } from "next/router";

export default function Fortune() {
  const router = useRouter();
  const { slug } = router.query;

  if (slug !== undefined && slug.length !== 0) {
    return <FortuneMain invitationCode={slug[0]} />;
  }

  return <FortuneMain />;
}