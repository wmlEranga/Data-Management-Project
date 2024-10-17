# main.py

from src.model_usage import load_model, prepare_input, make_prediction


def main():
    # You can call data collection and cleaning functions here
    # Example of using the model
    model = load_model("models/versioned/current_model.pkl")
    # Prepare input data and make predictions as needed...


if __name__ == "__main__":
    main()
