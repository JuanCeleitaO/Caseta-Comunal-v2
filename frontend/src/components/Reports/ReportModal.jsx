import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import { CameraOutlined, UploadOutlined } from '@ant-design/icons';
import { crearReporte } from '../../services/reportes.service';

const ReportModal = ({ visible, onCancel, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (visible) {
            try {
                const token = localStorage.getItem('token');
                const userData = localStorage.getItem('user');

                if (token && userData) {
                    const usuario = JSON.parse(userData);
                    if (usuario && usuario.nombre) {
                        form.setFieldsValue({ autor_nombre: usuario.nombre });
                        setIsLoggedIn(true); // <--- Ajuste aquí
                    }
                }
            } catch (error) {
                console.error("Error al verificar credenciales:", error);
            }
        } else {
            setIsLoggedIn(false); // <--- Ajuste aquí
            setFileList([]);
        }
    }, [visible, form]);

    const handleFinish = async (values) => {
        if (fileList.length === 0) {
            message.error('Debe adjuntar una foto del problema.');
            return;
        }

        const formData = new FormData();
        formData.append('autor_nombre', values.autor_nombre);
        formData.append('titulo', values.titulo);
        if (values.descripcion) {
            formData.append('descripcion', values.descripcion);
        }
        formData.append('foto', fileList[0].originFileObj);

        setLoading(true);
        try {
            await crearReporte(formData);
            message.success('Reporte creado exitosamente');
            form.resetFields();
            setFileList([]);
            onSuccess();
        } catch (error) {
            console.error('Error al crear reporte:', error);
            message.error('Hubo un error al enviar el reporte.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={<><CameraOutlined /> Reportar un problema</>}
            open={visible}
            onCancel={onCancel}
            footer={null}
            destroyOnHidden
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item
                    name="autor_nombre"
                    label="¿Tu nombre?"
                    rules={[{ required: true, message: 'El nombre es obligatorio' }]}
                >
                    <Input placeholder="Ej. Armando Mendoza" disabled={isLoggedIn} />
                </Form.Item>

                <Form.Item
                    name="titulo"
                    label="¿Qué está pasando?"
                    rules={[{ required: true, message: 'Debe indicar cuál es el problema' }]}
                >
                    <Input placeholder="Ej. Balance maquillado" />
                </Form.Item>

                <Form.Item name="descripcion" label="Descripción adicional (Opcional)">
                    <Input.TextArea rows={3} placeholder="Detalles sobre el problema..." />
                </Form.Item>

                <Form.Item label="Foto del problema" required>
                    <Upload
                        beforeUpload={() => false}
                        maxCount={1}
                        fileList={fileList}
                        onChange={({ fileList: newFileList }) => setFileList(newFileList)}
                        accept="image/jpeg,image/png,image/webp"
                    >
                        <Button size="large" icon={<UploadOutlined />} style={{ width: '100%' }}>
                            Seleccionar Imagen o Abrir Cámara
                        </Button>
                    </Upload>
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={loading} block size="large" style={{ marginTop: '8px' }}>
                    Enviar reporte
                </Button>
            </Form>
        </Modal>
    );
};

export default ReportModal;