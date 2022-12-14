import { Button, ButtonProps } from '@fjlaubscher/matter';
import { useNavigate } from 'react-router-dom';

type Props = {
  to: string;
} & ButtonProps;

const LinkButton = (props: Props) => {
  const navigate = useNavigate();
  return <Button {...props} onClick={() => navigate(props.to)} />;
};

export default LinkButton;
