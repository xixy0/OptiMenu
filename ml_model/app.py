import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from flask_cors import CORS 

app = Flask(__name__)

# Enable CORS for the entire app
CORS(app)

# Load dataset and prepare data
DATA_FILE = './data/synthetic_sales_data.csv'

# Function to train the model
def train_model():
    # Load the dataset
    data = pd.read_csv(DATA_FILE)
    
    # Prepare the features and target variable
    X = data[['prev_day_sales', 'last_weekday_sales', 'prev_month_sales', 'last_year_sales']]
    y = data['sales']
    
    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train the XGBoost model
    model = XGBRegressor(n_estimators=50, max_depth=4, subsample=0.8, colsample_bytree=0.8, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate the model
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    print(f"Model trained with MSE: {mse}")
    
    return model

# Train the model when the app starts
model = train_model()

@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict the sales for the current day based on previous sales data for multiple items.
    """
    try:
        # Get input data
        input_data = request.json
        
        # Validate input data
        if not isinstance(input_data, list):
            return jsonify({'error': 'Input should be a list of items'}), 400

        required_fields = ['id', 'prev_day_sales', 'last_weekday_sales', 'prev_month_sales', 'last_year_sales']

        predictions = []

        for item in input_data:
            # Ensure all required fields are provided
            for field in required_fields:
                if field not in item:
                    return jsonify({'error': f"Missing field: {field} in item with id {item.get('id', 'unknown')}"}), 400

            # Prepare input array for prediction
            input_array = np.array([[
                item['prev_day_sales'],
                item['last_weekday_sales'],
                item['prev_month_sales'],
                item['last_year_sales']
            ]])

            # Make prediction
            predicted_sales = model.predict(input_array)[0]

            # Append result with item ID or name
            predictions.append({
                'id': item['id'],
                'name': item.get('name', 'unknown'),
                'predicted_sales': float(predicted_sales)
            })

        # Sort predictions by predicted sales in descending order
        sorted_predictions = sorted(predictions, key=lambda x: x['predicted_sales'], reverse=True)

        return jsonify(sorted_predictions)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
