import Banner from '@/components/Banner';
import Container from '@/components/Container';
import DefaultText from '@/components/DefaultText';
import Input from '@/components/Input';
import { useUser } from '@/context/UserContext';
import { API_URL_BASE } from '@/libs/api';
import { User, UserRegister } from '@/libs/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function UserScreen() {
    const { user, setUser, token, setToken } = useUser();
    const navigation = useNavigation();

    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [deleteModalVisible, setDeleteModalVisible] =
        useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!user || !token) navigation.navigate('Login');
    }, [user, token]);

    const [message, setMessage] = useState<string>('');
    const [userForm, setUserForm] = useState<UserRegister>({
        nome: user?.nome || '',
        email: user?.email || '',
        senha: user?.senha || '',
        role: user?.role || 'user',
    });

    async function handleLogout() {
        setLoading(true);

        await AsyncStorage.setItem('token', '');
        await AsyncStorage.setItem('user', '');

        setToken(undefined);
        setUser(undefined);

        navigation.navigate('Login');
        setLoading(false);
    }

    async function handleUpdate() {
        if (!user || !user.id) {
            setMessage('Usuário inválido para atualizar');
            setEditModalVisible(false);
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${API_URL_BASE}/usuarios/${user?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(userForm),
            });

            if (res.status === 403 || res.status === 401) {
                setMessage(
                    'Você não tem permissão para atualizar seu usuário, você será redirecionado para a tela de login',
                );

                setTimeout(() => {
                    setUser(undefined);
                    setToken(undefined);
                    navigation.navigate('Login');
                }, 3000);
            }

            if (res.ok) {
                setMessage('Seu usuário foi atualizado com sucesso!');

                const data: User = await res.json();
                await AsyncStorage.setItem('user', JSON.stringify(data));
                setUser(data);
                setEditModalVisible(false);
            }
        } catch (err) {
            setMessage('Não foi possível atualizar seu usuário');
            setEditModalVisible(false);
            console.log(err);
        } finally {
            setLoading(false);
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    }

    async function handleDelete() {
        if (!user || !user.id) {
            setMessage('Usuário inválido para excluir');
            setDeleteModalVisible(false);
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${API_URL_BASE}/usuarios/${user?.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 403 || res.status === 401) {
                setMessage(
                    'Você não tem permissão para excluir seu usuário, você será redirecionado para a tela de login',
                );

                setTimeout(() => {
                    setUser(undefined);
                    setToken(undefined);
                    navigation.navigate('Login');
                }, 3000);

                return;
            }

            if (res.ok) {
                setMessage(
                    'Seu usuário foi excluido com sucesso! Você será redirecionado para a página de Login em breve',
                );
                await AsyncStorage.setItem('user', '');
                setUser(undefined);
                setDeleteModalVisible(false);
                navigation.navigate('Login');
            } else {
                throw new Error(await res.text());
            }
        } catch (err) {
            setMessage('Não foi possível excluir seu usuário');
            setDeleteModalVisible(false);
            console.log(err);
        } finally {
            setLoading(false);
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    }

    return (
        <View>
            <Banner
                title="Usuário"
                imageUri="https://cfbio.gov.br/wp-content/uploads/2024/05/cfbio-2024-158-01-INTERNA-SITE.jpg"
            />

            <Container>
                {message && <DefaultText>{message}</DefaultText>}

                <View style={styles.userInfoContainer}>
                    <View style={styles.userInfoField}>
                        <Icon name="address-card" size={24} />
                        <DefaultText>{user?.nome}</DefaultText>
                    </View>

                    <View style={styles.userInfoField}>
                        <Icon name="envelope" size={24} />
                        <DefaultText>{user?.email}</DefaultText>
                    </View>

                    <View style={styles.userInfoField}>
                        <Icon name="lock" size={24} />
                        <DefaultText>{user?.role}</DefaultText>
                    </View>

                    <View style={styles.userInfoField}>
                        <Icon name="list" size={24} />
                        <DefaultText>
                            Relatórios feitos: {user?.relatorios.length}
                        </DefaultText>
                    </View>
                </View>

                <View style={styles.actions}>
                    <Button onPress={() => setEditModalVisible(true)}>
                        Editar Usuário
                    </Button>
                    <Button onPress={handleLogout} color="gray">
                        Logout
                    </Button>
                    <Button
                        onPress={() => setDeleteModalVisible(true)}
                        color="red"
                    >
                        Excluir Conta
                    </Button>
                </View>
            </Container>

            <Modal visible={editModalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <DefaultText>Editar Usuário</DefaultText>

                        <Input
                            label="Nome"
                            value={userForm.nome}
                            placeholder="Digite seu nome"
                            autoCapitalize="words"
                            autoComplete="name"
                            onChangeText={(nome) =>
                                setUserForm((prev) => ({ ...prev, nome }))
                            }
                        />

                        <Input
                            label="Email"
                            value={userForm.email}
                            placeholder="Digite seu email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            onChangeText={(email) =>
                                setUserForm((prev) => ({ ...prev, email }))
                            }
                        />

                        <Input
                            label="Senha"
                            value={userForm.senha}
                            placeholder="Digite sua senha"
                            secureTextEntry
                            autoCapitalize="none"
                            autoComplete="password"
                            onChangeText={(senha) =>
                                setUserForm((prev) => ({ ...prev, senha }))
                            }
                        />

                        <Button
                            disabled={loading}
                            style={loading && { opacity: 0.5 }}
                            color={loading ? 'gray' : 'green'}
                            onPress={loading ? undefined : handleUpdate}
                        >
                            Salvar
                        </Button>

                        <Button
                            disabled={loading}
                            style={loading && { opacity: 0.5 }}
                            color="gray"
                            onPress={
                                loading
                                    ? undefined
                                    : () => setEditModalVisible(false)
                            }
                        >
                            Cancelar
                        </Button>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={deleteModalVisible}
                transparent
                animationType="fade"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <DefaultText>
                            Tem certeza que deseja excluir sua conta?
                        </DefaultText>

                        <Button
                            disabled={loading}
                            style={loading && { opacity: 0.5 }}
                            color={loading ? 'gray' : 'red'}
                            onPress={loading ? undefined : handleDelete}
                        >
                            Excluir
                        </Button>

                        <Button
                            disabled={loading}
                            style={loading && { opacity: 0.5 }}
                            color="gray"
                            onPress={
                                loading
                                    ? undefined
                                    : () => setDeleteModalVisible(false)
                            }
                        >
                            Cancelar
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    userInfoContainer: {
        marginVertical: 8,
        gap: 8,
    },

    userInfoField: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 24,
        width: 300,
        gap: 12,
    },

    actions: {
        marginVertical: 8,
        gap: 8,
    },
});
