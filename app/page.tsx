import { FaGithub } from "react-icons/fa";
import LinkButton from "../components/buttons/linkButton";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-2xl">Welcome to NissesGen!</h1>
      <div className="flex gap-4">
        <LinkButton href="/game">Go to Game</LinkButton>
        <LinkButton
          href="https://github.com/enyineer/nissesgen/"
          className="flex gap-2 items-center"
        >
          <div>GitHub</div>
          <FaGithub />
        </LinkButton>
      </div>
    </div>
  );
}
