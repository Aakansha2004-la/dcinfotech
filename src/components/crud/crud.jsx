import { Modal, message } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';
const { confirm } = Modal

const showDeleteConfirm = (warning, content, handleDelete, fetchCourses) => {
    confirm({
        title: warning,
        icon: <ExclamationCircleFilled />,
        content: content,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
            await handleDelete();
            await fetchCourses();
        },
        onCancel() {
            console.log('Cancel');
        },
        width: 500,
    });
};


export { showDeleteConfirm }