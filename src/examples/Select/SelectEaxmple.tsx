import Select from '../../components/select/Select';

const SelectExample = () => {
  return (
    <Select>
      <Select.Trigger>
        <Select.Value placeholder='select option' />
        <span>▼</span>
      </Select.Trigger>
      <Select.Content>
        <Select.Item value='option 1'>option 1</Select.Item>
        <Select.Item value='option 2'>option 2</Select.Item>
        <Select.Item value='option 3'>option 3</Select.Item>
      </Select.Content>
    </Select>
  );
};

export default SelectExample;
