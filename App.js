import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const buttons = ['LIMPAR', 'DEL', '%', '/', 7, 8, 9, "x", 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '+/-', '='];

  const [currentNumber, setCurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState("");

  function calculator() {
    const splitNumbers = currentNumber.split(' ');
    const firstNumber = parseFloat(splitNumbers[0]);
    const operator = splitNumbers[1];
    const lastNumber = parseFloat(splitNumbers[2]);

    if (isNaN(firstNumber) || isNaN(lastNumber)) return;

    switch (operator) {
      case '+':
        setCurrentNumber((firstNumber + lastNumber).toString());
        return;
      case '-':
        setCurrentNumber((firstNumber - lastNumber).toString());
        return;
      case 'x':
        setCurrentNumber((firstNumber * lastNumber).toString());
        return;
      case '/':
        setCurrentNumber(lastNumber === 0 ? "Error" : (firstNumber / lastNumber).toString());
        return;
      case '%':
        setCurrentNumber((firstNumber % lastNumber).toString());
        return;
    }
  }

  function handleInput(buttonPressed) {
    if (['+', '-', 'x', '/', '%'].includes(buttonPressed)) {
      setCurrentNumber(currentNumber + " " + buttonPressed + " ");
      return;
    }

    switch (buttonPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.trim().slice(0, -1));
        return;
      case 'LIMPAR':
        setLastNumber("");
        setCurrentNumber("");
        return;
      case '=':
        setLastNumber(currentNumber + " = ");
        calculator();
        return;
      case '+/-':
        if (currentNumber !== "") {
          setCurrentNumber((parseFloat(currentNumber) * -1).toString());
        }
        return;
    }

    setCurrentNumber(currentNumber + buttonPressed);
  }

  return (
    <View style={styles.container}>
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === '=' ?
            <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, { backgroundColor: '#6a0dad' }]}>
              <Text style={[styles.textButton, { color: "white", fontSize: 28 }]}>{button}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => handleInput(button)} key={button} style={styles.button}>
              <Text style={[styles.textButton, { color: typeof (button) === 'number' ? 'black' : '#6a0dad' }]}>{button}</Text>
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'flex-end',
  },
  results: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingBottom: 10,
  },
  resultText: {
    color: "#2c3e50",
    fontSize: 48,
  },
  historyText: {
    color: "#7f8c8d",
    fontSize: 20,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '25%',
    minHeight: 80,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  textButton: {
    color: '#2c3e50',
    fontSize: 24,
    border: none
  },
});
