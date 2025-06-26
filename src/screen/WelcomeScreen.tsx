import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function WelcomeScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>TaskHub</Text>
        <Text style={styles.subtitulo}>Organiza tu vida, una tarea a la vez</Text>
      </View>

      <View style={styles.logoContainer}>
        <Text style={styles.logoEmoji}>📋</Text>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-filled/150/000000/checklist.png' }}
          style={styles.imagen}
        />
      </View>

      <View style={styles.caracteristicas}>
        <View style={styles.caracteristica}>
          <Text style={styles.caracIcon}>✅</Text>
          <Text style={styles.caracTexto}>Crea y organiza tus tareas</Text>
        </View>
        <View style={styles.caracteristica}>
          <Text style={styles.caracIcon}>📱</Text>
          <Text style={styles.caracTexto}>Sincronización en tiempo real</Text>
        </View>
        <View style={styles.caracteristica}>
          <Text style={styles.caracIcon}>🎯</Text>
          <Text style={styles.caracTexto}>Prioridades y recordatorios</Text>
        </View>
      </View>

      <View style={styles.botones}>
        <TouchableOpacity
          style={styles.botonPrincipal}
          onPress={() => navigation.navigate('Registrer')}
        >
          <Text style={styles.textoBotonPrincipal}>COMENZAR</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.botonSecundario}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.textoBotonSecundario}>YA TENGO CUENTA</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.autor}>Tu asistente personal de productividad</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 22,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoEmoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  imagen: {
    width: 120,
    height: 120,
    opacity: 0.8,
  },
  caracteristicas: {
    width: '100%',
    paddingHorizontal: 20,
  },
  caracteristica: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  caracIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  caracTexto: {
    fontSize: 16,
    color: '#34495e',
    fontWeight: '500',
  },
  botones: {
    width: '100%',
    paddingHorizontal: 20,
  },
  botonPrincipal: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  textoBotonPrincipal: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botonSecundario: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#3498db',
  },
  textoBotonSecundario: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  autor: {
    fontSize: 14,
    color: '#95a5a6',
    textAlign: 'center',
    fontStyle: 'italic',
  },
})