import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, ConnectionPatch
import matplotlib.patches as patches

# Create figure and axis
fig, ax = plt.subplots(1, 1, figsize=(16, 20))
ax.set_xlim(0, 10)
ax.set_ylim(0, 24)
ax.axis('off')

# Define colors
start_color = '#2E7D32'  # Green
process_color = '#1565C0'  # Blue
decision_color = '#FF6F00'  # Orange
api_color = '#7B1FA2'  # Purple
display_color = '#C62828'  # Red
end_color = '#00695C'  # Teal

# Helper function to create rounded rectangle
def create_box(x, y, width, height, text, color, text_color='white', fontsize=10):
    box = FancyBboxPatch((x - width/2, y - height/2), width, height,
                        boxstyle="round,pad=0.1", 
                        facecolor=color, edgecolor='black', linewidth=1.5)
    ax.add_patch(box)
    ax.text(x, y, text, ha='center', va='center', 
           fontsize=fontsize, color=text_color, weight='bold', wrap=True)

# Helper function to create diamond (decision)
def create_diamond(x, y, width, height, text, color, text_color='white', fontsize=10):
    diamond = patches.RegularPolygon((x, y), 4, radius=width/2, 
                                     orientation=0.785,
                                     facecolor=color, edgecolor='black', linewidth=1.5)
    ax.add_patch(diamond)
    ax.text(x, y, text, ha='center', va='center', 
           fontsize=fontsize, color=text_color, weight='bold', wrap=True)

# Helper function to create arrow
def create_arrow(x1, y1, x2, y2, label='', offset=0):
    arrow = FancyArrowPatch((x1, y1), (x2, y2),
                           arrowstyle='->', mutation_scale=20,
                           linewidth=2, color='black')
    ax.add_patch(arrow)
    if label:
        mid_x, mid_y = (x1 + x2) / 2, (y1 + y2) / 2
        ax.text(mid_x + offset, mid_y + offset, label, 
               fontsize=8, ha='center', va='center',
               bbox=dict(boxstyle='round,pad=0.3', facecolor='white', edgecolor='none', alpha=0.8))

# START
y_pos = 23
create_box(5, y_pos, 2, 0.8, 'START\nUser Opens App', start_color, fontsize=9)
y_pos -= 1.2

# User Input Form
create_box(5, y_pos, 3, 1.2, 'User Input Form\n- Case Description\n- Optional Files', process_color, fontsize=9)
y_pos -= 1.8

# Submit Button
create_box(5, y_pos, 2.5, 0.8, 'User Clicks\n"Analyze My Rights"', process_color, fontsize=9)
y_pos -= 1.5

# Validation
create_diamond(5, y_pos, 1.5, 1.5, 'Description\nValid?', decision_color, fontsize=9)
y_pos -= 1.8

# No branch
create_box(2, y_pos - 0.5, 2, 0.8, 'Return Error\n(400)', '#E53935', fontsize=8)
create_arrow(4, y_pos - 0.5, 4.5, y_pos - 0.5, 'No', offset=-0.3)

# Yes branch - API Route
y_pos -= 2
create_box(5, y_pos, 3, 1.2, 'API Route\n/api/analyze\n(POST)', api_color, fontsize=9)
y_pos -= 1.8

# Check API Key
create_diamond(5, y_pos, 1.5, 1.5, 'GEMINI_API_KEY\nExists?', decision_color, fontsize=9)
y_pos -= 1.8

# No API Key
create_box(2, y_pos - 0.5, 2, 0.8, 'Return Error\n(500)', '#E53935', fontsize=8)
create_arrow(4, y_pos - 0.5, 4.5, y_pos - 0.5, 'No', offset=-0.3)

# Yes - Initialize Gemini
y_pos -= 2
create_box(5, y_pos, 3, 1, 'Initialize\nGoogle Gemini AI', api_color, fontsize=9)
y_pos -= 1.5

# Check Available Models
create_box(5, y_pos, 3, 1, 'Fetch Available\nModels from API', api_color, fontsize=9)
y_pos -= 1.5

# Try Models
create_box(5, y_pos, 3, 1.2, 'Try Models:\ngemini-pro\ngemini-1.5-flash', api_color, fontsize=9)
y_pos -= 1.8

# Create Prompt
create_box(5, y_pos, 3.5, 1.5, 'Create Legal Analysis Prompt\n- User Description\n- Philippine Laws\n- JSON Structure', api_color, fontsize=9)
y_pos -= 2

# Call Gemini API
create_box(5, y_pos, 3, 1, 'Call Gemini API\nGenerate Content', api_color, fontsize=9)
y_pos -= 1.5

# Parse Response
create_box(5, y_pos, 3, 1.2, 'Parse Gemini Response\nExtract JSON\nHandle Errors', api_color, fontsize=9)
y_pos -= 1.8

# Filter Lawyers
create_box(5, y_pos, 3, 1, 'Filter Lawyers\nby Case Type', api_color, fontsize=9)
y_pos -= 1.5

# Structure Response
create_box(5, y_pos, 3.5, 1.5, 'Structure CaseAnalysis\n- Case Type\n- Severity\n- Timeline\n- Laws, Rights, etc.', api_color, fontsize=9)
y_pos -= 2

# Return JSON
create_box(5, y_pos, 2.5, 1, 'Return JSON\nResponse', api_color, fontsize=9)
y_pos -= 1.5

# Frontend Receives Response
create_box(5, y_pos, 3, 1, 'Frontend Receives\nAnalysis Results', process_color, fontsize=9)
y_pos -= 1.5

# Display Results
create_box(5, y_pos, 3.5, 2, 'Display ResultsView\n- Case Summary\n- Risk Assessment\n- Relevant Laws\n- User Rights', display_color, fontsize=9)
y_pos -= 2.5

# Additional Sections
create_box(5, y_pos, 3.5, 2, 'Display Additional Sections\n- Recommended Lawyers\n- Essential Documents\n- Evidence Guide\n- Cost Estimate\n- Government Agencies', display_color, fontsize=9)
y_pos -= 2.5

# User Interactions
create_box(5, y_pos, 3, 1.2, 'User Interactions\n- View Lawyer Profiles\n- Reset to Form', display_color, fontsize=9)
y_pos -= 1.8

# END
create_box(5, y_pos, 2, 0.8, 'END', end_color, fontsize=9)

# Add title
ax.text(5, 23.5, 'Know Your Rights - Legal Analysis System Flowchart', 
       ha='center', va='bottom', fontsize=16, weight='bold')

# Add legend
legend_elements = [
    mpatches.Patch(facecolor=start_color, label='Start/End', edgecolor='black'),
    mpatches.Patch(facecolor=process_color, label='Process (Frontend)', edgecolor='black'),
    mpatches.Patch(facecolor=decision_color, label='Decision', edgecolor='black'),
    mpatches.Patch(facecolor=api_color, label='API/Backend Process', edgecolor='black'),
    mpatches.Patch(facecolor=display_color, label='Display/UI', edgecolor='black'),
]

ax.legend(handles=legend_elements, loc='upper right', fontsize=9, framealpha=0.9)

plt.tight_layout()
plt.savefig('system_flowchart.png', dpi=300, bbox_inches='tight', facecolor='white')
print("Flowchart saved as 'system_flowchart.png'")

