import RoomNavigation from "./RoomNavigation";

export default function RoomUserLayout({ children }) {
  return (
    <>
      <RoomNavigation />
      {children}
    </>
  );
}
