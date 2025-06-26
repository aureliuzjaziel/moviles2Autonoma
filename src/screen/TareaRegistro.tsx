import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../supabase/config'

export default function TareaRegistro() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState('media');

  async function agregarTarea() {
    if (!titulo.trim()) {
      Alert.alert('Error', 'El título es obligatorio');
      return;
    }

    // Obtener usuario actual
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      Alert.alert('Error', 'Usuario no autenticado');
      return;
    }

    // Insertar tarea en Supabase
    const { data, error } = await supabase
      .from('tareas')
      .insert([
        { 
          titulo: titulo,
          descripcion: descripcion,
          prioridad: prioridad,
          completada: false,
          usuario_id: user.id,
          fecha_creacion: new Date().toISOString()
        }
      ])

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    Alert.alert('Éxito', 'Tarea agregada correctamente');
    // Limpiar campos
    setTitulo('');
    setDescripcion('');
    setPrioridad('media');
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>Agregar Nueva Tarea</Text>
        
        <Text style={styles.label}>Título *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa el título de la tarea"
          value={titulo}
          onChangeText={setTitulo}
        />
        
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={styles.inputDescripcion}
          placeholder="Describe tu tarea..."
          value={descripcion}
          onChangeText={setDescripcion}
          multiline={true}
          numberOfLines={4}
        />
        
        <Text style={styles.label}>Prioridad</Text>
        <View style={styles.prioridadContainer}>
          <TouchableOpacity 
            style={[styles.prioridadBoton, prioridad === 'alta' && styles.prioridadSeleccionada]}
            onPress={() => setPrioridad('alta')}
          >
            <Text style={[styles.prioridadTexto, prioridad === 'alta' && styles.prioridadTextoSeleccionado]}>
              🔴 Alta
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.prioridadBoton, prioridad === 'media' && styles.prioridadSeleccionada]}
            onPress={() => setPrioridad('media')}
          >
            <Text style={[styles.prioridadTexto, prioridad === 'media' && styles.prioridadTextoSeleccionado]}>
              🟡 Media
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.prioridadBoton, prioridad === 'baja' && styles.prioridadSeleccionada]}
            onPress={() => setPrioridad('baja')}
          >
            <Text style={[styles.prioridadTexto, prioridad === 'baja' && styles.prioridadTextoSeleccionado]}>
              🟢 Baja
            </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.botonAgregar} onPress={agregarTarea}>
          <Text style={styles.textoBoton}>📝 Agregar Tarea</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputDescripcion: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
    height: 100,
    textAlignVertical: 'top',
  },
  prioridadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  prioridadBoton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  prioridadSeleccionada: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  prioridadTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  prioridadTextoSeleccionado: {
    color: '#fff',
  },
  botonAgregar: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBoton: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
})