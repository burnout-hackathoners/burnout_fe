interface Props {
  icon: string;
}

const Avatar = ({ icon }: Props) => {
  return (
    <div className="FlexContainer-sc-383a0367-0 Avatar__AvatarWrapper-sc-3c5e4c94-6 heWXvb hUYNFw">
      <img
        width={46}
        height={46}
        src={icon}
        alt="Badge"
        className="circular-avatar"
      />
    </div>
  );
};

export default Avatar;
