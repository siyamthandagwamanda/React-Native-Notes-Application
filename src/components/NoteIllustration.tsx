import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// A drawing of a small stack of notes, made from plain Views (no image file needed).
export default function NoteIllustration() {
  return (
    <View style={styles.stage}>
      <View style={[styles.paper, styles.back]} />
      <View style={[styles.paper, styles.middle]} />
      <View style={[styles.paper, styles.front]}>
        <Ionicons name="pin" size={26} color="#DC2626" style={styles.pin} />
        <View style={[styles.line, styles.heading]} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={[styles.line, styles.short]} />
        <Ionicons name="pencil" size={34} color="#2563EB" style={styles.pencil} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: { width: 220, height: 220, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' },
  paper: {
    position: 'absolute',
    width: 160,
    height: 190,
    borderRadius: 12,
    elevation: 4, 
    shadowColor: '#000', 
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  back: { backgroundColor: '#DBEAFE', transform: [{ rotate: '-12deg' }] },
  middle: { backgroundColor: '#FCE7F3', transform: [{ rotate: '7deg' }] },
  front: { backgroundColor: '#FEF3C7', padding: 22, paddingTop: 36, gap: 14 },
  pin: { position: 'absolute', top: -10, alignSelf: 'center' },
  line: { height: 6, borderRadius: 3, backgroundColor: '#E5C97A' },
  heading: { height: 10, width: '60%', backgroundColor: '#C9A94F' },
  short: { width: '45%' },
  pencil: { position: 'absolute', right: -14, bottom: -10, transform: [{ rotate: '-20deg' }] },
});