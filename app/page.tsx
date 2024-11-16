import LinkButton from "../components/buttons/linkButton";

export default function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <LinkButton href="/game">Go to Game</LinkButton>
    </div>
  );
}
