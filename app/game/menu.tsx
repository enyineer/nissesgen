import MenuItem from "./menuItem";
import {
  GiAchievement,
  GiAlarmClock,
  GiChecklist,
  GiSettingsKnobs,
  GiSmartphone,
  GiUpgrade,
} from "react-icons/gi";

export default function Menu() {
  return (
    <div className="flex flex-col gap-4 px-4 py-3 h-full bg-gray-800">
      <MenuItem href="/game" label="Clock" icon={<GiAlarmClock />} />
      <MenuItem href="/game/upgrades" label="Upgrades" icon={<GiUpgrade />} />
      <MenuItem
        href="/game/activities"
        label="Activities"
        icon={<GiSmartphone />}
      />
      <MenuItem
        href="/game/achievements"
        label="Achievements"
        icon={<GiAchievement />}
      />
      <MenuItem href="/game/stats" label="Stats" icon={<GiChecklist />} />
      <MenuItem
        href="/game/settings"
        label="Settings"
        icon={<GiSettingsKnobs />}
      />
    </div>
  );
}
