import json
import ollama


def analyze_task(task: str):
    prompt = f"""
Analyze this employee task:

{task}

Return ONLY valid JSON.

Use exactly this structure:

{{
  "priority": "High",
  "estimatedTime": "2-3 hours",
  "complexity": "Medium",
  "steps": [
    "Step 1",
    "Step 2",
    "Step 3",
    "Step 4"
  ],
  "advice": "Short productivity advice"
}}

Rules:
- priority must be High, Medium, or Low
- complexity must be Easy, Medium, or Hard
- give exactly 4 steps
- estimatedTime should be realistic
- advice should be short
- return JSON only
- do not use markdown
- do not add explanation outside JSON
"""

    try:
        response = ollama.chat(
            model="gemma3:1b",
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            format="json",
        )

        content = response["message"]["content"].strip()

        print("OLLAMA RAW RESPONSE:")
        print(content)

        if not content:
            raise ValueError("Ollama returned an empty response")

        result = json.loads(content)

        if not isinstance(result, dict):
            raise ValueError("AI response is not a JSON object")

        required_fields = [
            "priority",
            "estimatedTime",
            "complexity",
            "steps",
            "advice",
        ]

        for field in required_fields:
            if field not in result:
                raise ValueError(
                    f"AI response missing field: {field}"
                )

        if not isinstance(result["steps"], list):
            raise ValueError("AI steps must be a list")

        return result

    except json.JSONDecodeError as error:
        print("JSON ERROR:", error)
        raise ValueError(
            f"AI returned invalid JSON: {content}"
        )

    except Exception as error:
        print("OLLAMA ERROR:", error)
        raise