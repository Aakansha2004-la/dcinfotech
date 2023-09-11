import React, { useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { Select, Spin } from 'antd';
import { apiGetTeachers } from '../services/TeacherServices';
function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);
    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            fetchOptions(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }
                setOptions(newOptions);
                setFetching(false);
            });
        };
        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
        />
    );
}

// Usage of DebounceSelect

async function fetchUserList(username) {
    console.log('fetching user', username);
    return apiGetTeachers('ASC', 1, 10, username)
        .then((res) => res.data.data)
        .then((array) => array.map(
            teacher => ({
                label: `${teacher.full_name}`,
                value: teacher.id,
            })
        ))
}
const MultiSelectTeachers = ({ value, onChange }) => {
    // const [value, setValue] = useState([]);
    return (
        <DebounceSelect
            mode="multiple"
            value={value}
            placeholder="Select teachers"
            fetchOptions={fetchUserList}
            onChange={onChange}
            style={{
                width: '90%',
                marginBlock: '15px'
            }}
        />
    );
};
export default MultiSelectTeachers;