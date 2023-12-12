// src/components/Filter/Filter.js
import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

const Filter = ({ onFilterChange }) => {
    const [showFilters, setShowFilters] = React.useState(false);
    const [conditions, setConditions] = React.useState([{ andOr: '', id: '', operator: '', value: '' }]);

    const handleAddCondition = () => {
        if (showFilters) {
            const lastCondition = conditions[conditions.length - 1];
            const isLastConditionFilled = Object.values(lastCondition).some(value => value !== '');

            if (isLastConditionFilled) {
                setConditions([...conditions, { andOr: '', id: '', operator: '', value: '' }]);
            } else {
                alert("Please fill in all values before adding a new condition.");
            }
        } else {
            setShowFilters(true);
        }
    };

    const handleDeleteCondition = (index) => {
        const updatedConditions = [...conditions];
        updatedConditions.splice(index, 1);
         console.log("Updated Conditions:", updatedConditions);
        setConditions(updatedConditions);
        onFilterChange(updatedConditions);
    };

    const handleConditionChange = (index, field, value) => {
        const updatedConditions = [...conditions];
        updatedConditions[index][field] = value;

        // Update the operator based on the selected column
        if (field === 'id') {
            switch (value) {
                case 'name':
                case 'screen_name':
                case 'location':
                    updatedConditions[index].operator = 'CONTAINS';
                    break;
                case 'followers_count':
                case 'following_count':
                    updatedConditions[index].operator = 'GTE';
                    break;
                case 'verified':
                    updatedConditions[index].operator = 'EQ';
                    updatedConditions[index].value = 'Yes';
                    break;
                default:
                    updatedConditions[index].operator = '';
                    break;
            }
            
        }

        setConditions(updatedConditions);
        onFilterChange(updatedConditions);
    };



    return (
        <>
            <h6 className='w-50' style={{ margin: "40px 0 20PX", fontWeight: "700" }}>FILTERS</h6>
            <div className='w-50' style={{ border: "1px solid #c6c7c8", margin: "0px 0 40px", padding: "30px" }}>
                {showFilters && conditions.map((condition, index) => (
                    <Form key={index} className='d-flex align-items-cente'>

                        {index === 0 ? (
                            <Form.Control as="select" defaultValue="&&" style={{ margin: "10px" }}>
                                <option value="&&">Where</option>
                            </Form.Control>
                        ) : index === 1 ? (
                            <Form.Select as="select" style={{ margin: "10px" }} onChange={(e) => handleConditionChange(index, 'andOr', e.target.value)}>
                                <option value="&&">AND</option>
                                <option value="||">OR</option>
                            </Form.Select>
                        ) : (
                            <Form.Control style={{ margin: "10px" }} as="select" defaultValue="&&">
                                <option value="&&">And</option>
                            </Form.Control>
                        )}

                        <Form.Select style={{ margin: "10px" }} onChange={(e) => handleConditionChange(index, 'id', e.target.value)} value={condition.id}>
                            <option value=""></option>
                            <option value="name">Name</option>
                            <option value="screen_name">Screen Name</option>
                            <option value="followers_count">Followers Count</option>
                            <option value="following_count">Following Count</option>
                            <option value="location">Location</option>
                            <option value="verified">Verified</option>
                        </Form.Select>

                        <Form.Select style={{ margin: "10px" }} onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}>
                            {condition.id === 'name' || condition.id === 'screen_name' || condition.id === 'location' ? (
                                <>
                                    <option value="CONTAINS">Contains</option>
                                    <option value="EQ">Equals</option>
                                </>
                            ) : condition.id === 'followers_count' || condition.id === 'following_count' ? (
                                <>
                                    <option value="GTE">{'>='}</option>
                                    <option value="LTE">{'<='}</option>
                                </>
                            ) : condition.id === 'verified' ? (
                                <option value="EQ">Equals</option>
                            ) : null}
                        </Form.Select>
                        {condition.id === 'verified' ?
                            <Form.Select as="select" style={{ margin: "10px" }} onChange={(e) => handleConditionChange(index, 'value', e.target.value)} value={condition.value}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </Form.Select> :
                            <Form.Control type="text" style={{ margin: "10px" }} value={condition.value}
                                onChange={(e) => handleConditionChange(index, 'value', e.target.value)}>
                            </Form.Control>
                        }

                        <Button variant="danger" style={{ margin: "10px" }} onClick={() => handleDeleteCondition(index)}>Delete</Button>

                    </Form>
                ))}
                <Button variant="secondary" style={{ margin: "10px" }} onClick={handleAddCondition}>+ Add Filter</Button>
            </div>
        </>
    );

};

export default Filter;
