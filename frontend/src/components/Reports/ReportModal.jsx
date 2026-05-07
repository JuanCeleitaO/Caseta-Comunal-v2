import React, { useState } from 'react';
import { Modal, Form, Input, Upload, Button, message } from 'antd';
import { UploadOutlined, CameraOutlined } from '@ant-design/icons';

const ReportModal = ({ visible, onCancel, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('autor', values.autor);
        formData.append('titulo', values.titulo);
        formData.append('descripcion', values.descripcion);
        // Tomamos el archivo del componente Upload de AntD
        if (values.imagen && values.imagen.fileList[0]) {
            formData.append('imagen', values.imagen.fileList[0].originFileObj);
        }

        try {
            // Nota: Aquí usamos la IP/URL de tu backend en Docker
            const response = await fetch('http://localhost:4000/api/conflictos', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                message.success('¡Reporte enviado con éxito!');
                form.resetFields();
                onSuccess();
            }
        } catch (error) {
            message.error('Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Nuevo Reporte Comunitario"
            open={visible}
            onCancel={onCancel}
            footer={null}
            centered
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item name="autor" label="Tu Nombre" rules={[{ required: true }]}>
                    <Input placeholder="Ej: Juan Pérez" />
                </Form.Item>
                <Form.Item name="titulo" label="¿Qué pasa?" rules={[{ required: true }]}>
                    <Input placeholder="Ej: Puente roto" />
                </Form.Item>
                <Form.Item name="descripcion" label="Más detalles">
                    <Input.TextArea rows={3} />
                </Form.Item>
                <Form.Item name="imagen" label="Foto de la novedad" rules={[{ required: true }]}>
                    <Upload beforeUpload={() => false} listType="picture" maxCount={1}>
                        <Button icon={<CameraOutlined />} block size="large">Seleccionar o Tomar Foto</Button>
                    </Upload>
                </Form.Item>
                <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                    ENVIAR REPORTE
                </Button>
            </Form>
        </Modal>
    );
};

export default ReportModal;