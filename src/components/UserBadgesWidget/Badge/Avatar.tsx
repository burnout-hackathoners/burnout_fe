interface Props {
  icon: string;
}

const Avatar = ({ icon }: Props) => {
  return (
    <div className="FlexContainer-sc-383a0367-0 Avatar__AvatarWrapper-sc-3c5e4c94-6 heWXvb hUYNFw">
      <img width={48} height={48} src={icon} alt="Badge" />
    </div>
  );
};

export default Avatar;
