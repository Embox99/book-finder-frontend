import "./ProfileSection.css";

function ProfileSection({ id, title, content }) {
  return (
    <div id={id}>
      <h2>{title}</h2>
      {content}
    </div>
  );
}

export default ProfileSection;