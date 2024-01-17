import React, {useState} from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

const DropDown = ({open, setOpen, value, setValue, items, style}) => {


  return (
       <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            style={style}
        />
  )
}

export default DropDown