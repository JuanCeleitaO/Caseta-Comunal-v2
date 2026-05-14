import React, { useState } from 'react';
import { Modal, Form, Input, Upload, Button, App as AntApp } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ReportModal = ({ visible, onCancel, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const { message } = AntApp.useApp();

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('titulo', values.titulo);
            formData.append('autor_nombre', values.autor_nombre);
            formData.append('descripcion', values.descripcion || '');

            if (values.foto && values.foto.length > 0) {
                formData.append('foto', values.foto[0].originFileObj);
            }

            const response = await fetch('http://localhost:3004/api/reportes', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                message.success('Reporte enviado con éxito');
                form.resetFields();
                onSuccess();
            } else {
                message.error('Error al enviar el reporte');
            }
        } catch (error) {
            message.error('Error de conexión con el servidor');
        } finally {
            setLoading(false);
        }
    };

    const normFile = (e) => {
        if (Array.isArray(e)) return e;
        return e?.fileList;
    };

    return (
        <Modal
            title="Nuevo Reporte Comunitario"
            open={visible}
            onCancel={onCancel}
            footer={null}
            destroyOnHidden
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="autor_nombre"
                    label="¿Tu nombre?"
                    rules={[{ required: true, message: 'Ingresa tu nombre' }]}
                >
                    <Input placeholder="Ej: Juan David" />
                </Form.Item>

                <Form.Item
                    name="titulo"
                    label="¿Qué sucede?"
                    rules={[{ required: true, message: 'Ingresa un título' }]}
                >
                    <Input placeholder="Ej: Árbol caído en la vía" />
                </Form.Item>

                <Form.Item name="descripcion" label="Detalles">
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item
                    name="foto"
                    label="Foto evidencia"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: 'La foto es obligatoria' }]}
                >
                    <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Subir Foto</Button>
                    </Upload>
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={loading} block>
                    Enviar Reporte
                </Button>
            </Form>
        </Modal>
    );
};

export default ReportModal;