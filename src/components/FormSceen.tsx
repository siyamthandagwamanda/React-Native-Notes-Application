import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { form } from '../styles/form';

type Props = {
  children: ReactNode;          
  style?: StyleProp<ViewStyle>; 
};

export default function FormScreen({ children, style = form.container }: Props) {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={style} keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}