import React, { useState } from 'react';
import { Modal, Form, Input, Upload, Button, App } from 'antd';
import { CameraOutlined } from '@ant-design/icons';

const ReportModalContent = ({ visible, onCancel, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { message: messageApi } = App.useApp();

    const handleSubmit = async (values) => {
        setLoading(true);
        const formData = new FormData();

        formData.append('autor_nombre', values.autor);
        formData.append('titulo', values.titulo);
        formData.append('descripcion', values.descripcion || '');
        if (values.imagen && values.imagen[0]) {
            formData.append('imagen', values.imagen[0].originFileObj);
        }

        try {
            // USAMOS FETCH NATIVO (No necesita instalar nada)
            const response = await fetch('http://localhost:3004/api/reportes', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                messageApi.success('¡Reporte enviado con éxito!');
                form.resetFields();
                onSuccess();
            } else {
                const errorData = await response.json();
                messageApi.error(errorData.error || 'Error en el servidor');
            }
        } catch (error) {
            console.error("Error en la conexión:", error);
            messageApi.error('No se pudo conectar con el servidor en el puerto 3004');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title="Nuevo Reporte Comunitario" open={visible} onCancel={onCancel} footer={null} centered>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item name="autor" label="Tu Nombre" rules={[{ required: true }]}>
                    <Input placeholder="Ej: Juan David" />
                </Form.Item>
                <Form.Item name="titulo" label="¿Qué pasa?" rules={[{ required: true }]}>
                    <Input placeholder="Ej: Calle inundada" />
                </Form.Item>
                <Form.Item name="descripcion" label="Descripción">
                    <Input.TextArea rows={3} />
                </Form.Item>
                <Form.Item
                    name="imagen"
                    label="Foto"
                    rules={[{ required: true }]}
                    valuePropName="fileList"
                    getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                >
                    <Upload beforeUpload={() => false} listType="picture" maxCount={1}>
                        <Button icon={<CameraOutlined />} block>Subir Foto</Button>
                    </Upload>
                </Form.Item>
                <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                    ENVIAR REPORTE
                </Button>
            </Form>
        </Modal>
    );
};

const ReportModal = (props) => (
    <App><ReportModalContent {...props} /></App>
);

export default ReportModal;