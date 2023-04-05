type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return <div className={'znc'} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default PostBody;
