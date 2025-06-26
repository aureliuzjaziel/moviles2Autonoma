import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase/config'

type Tarea = {
  id: number;
  usuario_id: string;
  titulo: string;
  descripcion?: string;
  prioridad: 'alta' | 'media' | 'baja';
  fecha_creacion: string;
  completada: boolean;
};

export default function ListaTareas() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Cargar tareas al iniciar
  useEffect(() => {
    cargarTareas();
  }, []);

  async function cargarTareas() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      Alert.alert('Error', 'Usuario no autenticado');
      return;
    }

    const { data, error } = await supabase
      .from('tareas')
      .select('*')
      .eq('usuario_id', user.id)
      .order('fecha_creacion', { ascending: false });

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    setTareas(data || []);
  }

  interface MarcarCompletadaParams {
    id: number;
    completada: boolean;
  }

  async function marcarCompletada({ id, completada }: MarcarCompletadaParams): Promise<void> {
    const { error } = await supabase
      .from('tareas')
      .update({ completada: !completada })
      .eq('id', id);

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    // Recargar tareas para mostrar cambios
    cargarTareas();
  }

  interface EliminarTareaParams {
    id: number;
  }

  async function eliminarTarea(id: EliminarTareaParams['id']): Promise<void> {
    Alert.alert(
      'Eliminar tarea',
      '¿Estás seguro de que quieres eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' as const },
        { 
          text: 'Eliminar', 
          style: 'destructive' as const,
          onPress: async () => {
            const { error } = await supabase
              .from('tareas')
              .delete()
              .eq('id', id);

            if (error) {
              Alert.alert('Error', error.message);
              return;
            }

            cargarTareas();
          }
        }
      ]
    );
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await cargarTareas();
    setRefreshing(false);
  };

  const renderTarea = ({ item }: { item: Tarea }) => (
    <View style={styles.tareaContainer}>
      <View style={styles.tareaContent}>
        <TouchableOpacity 
          style={styles.checkContainer}
          onPress={() => marcarCompletada({ id: item.id, completada: item.completada })}
        >
          <Text style={styles.checkBox}>
            {item.completada ? '✅' : '⬜'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.tareaInfo}>
          <Text style={[
            styles.tituloTarea, 
            item.completada && styles.tareaCompletada
          ]}>
            {item.titulo}
          </Text>
          
          {item.descripcion ? (
            <Text style={[
              styles.descripcionTarea,
              item.completada && styles.tareaCompletada
            ]}>
              {item.descripcion}
            </Text>
          ) : null}
          
          <View style={styles.metaInfo}>
            <Text style={styles.prioridad}>
              {item.prioridad === 'alta' ? '🔴 Alta' : 
               item.prioridad === 'media' ? '🟡 Media' : '🟢 Baja'}
            </Text>
            <Text style={styles.fecha}>
              {new Date(item.fecha_creacion).toLocaleDateString()}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.eliminarBoton}
          onPress={() => eliminarTarea(item.id)}
        >
          <Text style={styles.eliminarTexto}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mis Tareas</Text>
      
      {tareas.length === 0 ? (
        <View style={styles.sinTareas}>
          <Text style={styles.sinTareasTexto}>📝</Text>
          <Text style={styles.sinTareasTexto}>No tienes tareas aún</Text>
          <Text style={styles.sinTareasSubtexto}>
            Ve a "Hacer tarea" para agregar una nueva
          </Text>
        </View>
      ) : (
        <FlatList
          data={tareas}
          renderItem={renderTarea}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  tareaContainer: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tareaContent: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'flex-start',
  },
  checkContainer: {
    marginRight: 15,
    paddingTop: 2,
  },
  checkBox: {
    fontSize: 20,
  },
  tareaInfo: {
    flex: 1,
  },
  tituloTarea: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  descripcionTarea: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  tareaCompletada: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prioridad: {
    fontSize: 12,
    fontWeight: '600',
  },
  fecha: {
    fontSize: 12,
    color: '#999',
  },
  eliminarBoton: {
    padding: 5,
    marginLeft: 10,
  },
  eliminarTexto: {
    fontSize: 18,
  },
  sinTareas: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sinTareasTexto: {
    fontSize: 48,
    marginBottom: 10,
  },
  sinTareasSubtexto: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
})