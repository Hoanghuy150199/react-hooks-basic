import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};
TodoForm.defaultProps = {
    onSubmit: null
}

function TodoForm(props) {
    const {onSubmit} = props;
    const [value, setValue] = useState('');

    function handleValueChange(e){
        console.log(e.target.value);
        setValue(e.target.value);
    }

    function handleSubmit(e){
        //prevent reloading browser
        e.preventDefault();
        if (!onSubmit) return;

        const formValues = {
            title: value
        }
        onSubmit(formValues);

        //reset value after submission
        setValue('');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={value} onChange={handleValueChange}/>
                {/* <input type="submit" value={onSubmit}/> */}
            </form>
        </div>
    );
}

export default TodoForm;