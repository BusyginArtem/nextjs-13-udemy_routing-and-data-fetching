type Props = {
  children: React.ReactNode;
  icon: React.ElementType;
};

function LogisticsItem(props: Props) {
  const { icon: Icon } = props;

  return (
    <li className='flex flex-row md:flex-col text-center items-center text-2xl text-[#aefff8] md:items-start md:text-start'>
      <span className='mr-4 text-[#18e0d0]'>
        <Icon className='w-8 h-8' />
      </span>
      {props.children}
    </li>
  );
}

export default LogisticsItem;
