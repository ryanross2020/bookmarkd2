import React from 'react';

export default (props) => {

    //State for form data
    const [formData, setFormData] = React.useState(props.initial);

    //useEffect to update for data when state changes
    //
    React.useEffect(() => {
        setFormData(props.initial);
    }, [props.initial]);

    //handlechange function
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    
    return (
        <>
            <label>Title:</label>
            <input
                type="text"
                name="title"
                value={formData.name}
                onChange={handleChange}
            /><br />
            <label>URL:</label>
            <input
                type="text"
                name="url"
                value={formData.description}
                onChange={handleChange}
            /><br />
            <button
                onClick={() => {
                    props.handleSubmit(formData);
                    setFormData(props.initial);
                }}
            >
                SUBMIT
            </button>
        </>
    );
};