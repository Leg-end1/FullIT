package com.stackmaster.factory;

import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

/**
 * Enterprise Creational Pattern: Factory Method
 * 
 * In a Spring Boot or Jakarta EE environment, this factory handles 
 * the instantiation of TaskProviders based on the active profile or 
 * configuration metadata.
 */
public class TaskProviderFactory {
    
    private static ITaskProvider instance;

    public static ITaskProvider getProvider(String providerType) {
        if (instance == null) {
            if ("DATABASE".equalsIgnoreCase(providerType)) {
                instance = new DatabaseTaskProvider();
            } else {
                instance = new StaticTaskProvider();
            }
        }
        return instance;
    }

    public interface ITaskProvider {
        List<Object> getTasksByTrack(String trackId);
        Object getTaskById(String taskId);
    }

    private static class StaticTaskProvider implements ITaskProvider {
        @Override
        public List<Object> getTasksByTrack(String trackId) {
            // Logic for filtering static task list
            return new ArrayList<>(); 
        }

        @Override
        public Object getTaskById(String taskId) {
            return null;
        }
    }

    private static class DatabaseTaskProvider implements ITaskProvider {
        @Override
        public List<Object> getTasksByTrack(String trackId) {
            // JDBC or JPA Logic implementation
            return new ArrayList<>();
        }

        @Override
        public Object getTaskById(String taskId) {
            return null;
        }
    }
}
